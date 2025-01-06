"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FixtureRunner = void 0;
var _util = require("../util");
var _utils = require("playwright-core/lib/utils");
var _fixtures = require("../common/fixtures");
/**
 * Copyright Microsoft Corporation. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

class Fixture {
  constructor(runner, registration) {
    this.runner = void 0;
    this.registration = void 0;
    this.value = void 0;
    this.failed = false;
    this._useFuncFinished = void 0;
    this._selfTeardownComplete = void 0;
    this._teardownWithDepsComplete = void 0;
    this._runnableDescription = void 0;
    this._deps = new Set();
    this._usages = new Set();
    this.runner = runner;
    this.registration = registration;
    this.value = null;
    const title = this.registration.customTitle || this.registration.name;
    this._runnableDescription = {
      title,
      phase: 'setup',
      location: registration.location,
      slot: this.registration.timeout === undefined ? undefined : {
        timeout: this.registration.timeout,
        elapsed: 0
      }
    };
  }
  async setup(testInfo) {
    if (typeof this.registration.fn !== 'function') {
      this.value = this.registration.fn;
      return;
    }
    const params = {};
    for (const name of this.registration.deps) {
      const registration = this.runner.pool.resolveDependency(this.registration, name);
      const dep = await this.runner.setupFixtureForRegistration(registration, testInfo);
      // Fixture teardown is root => leafs, when we need to teardown a fixture,
      // it recursively tears down its usages first.
      dep._usages.add(this);
      // Don't forget to decrement all usages when fixture goes.
      // Otherwise worker-scope fixtures will retain test-scope fixtures forever.
      this._deps.add(dep);
      params[name] = dep.value;
      if (dep.failed) {
        this.failed = true;
        return;
      }
    }

    // Break the registration function into before/after steps. Create these before/after stacks
    // w/o scopes, and create single mutable step that will be converted into the after step.
    const shouldGenerateStep = !this.registration.hideStep && !this.registration.name.startsWith('_') && !this.registration.option;
    const isInternalFixture = this.registration.location && (0, _util.filterStackFile)(this.registration.location.file);
    let mutableStepOnStack;
    let afterStep;
    let called = false;
    const useFuncStarted = new _utils.ManualPromise();
    (0, _util.debugTest)(`setup ${this.registration.name}`);
    const useFunc = async value => {
      if (called) throw new Error(`Cannot provide fixture value for the second time`);
      called = true;
      this.value = value;
      this._useFuncFinished = new _utils.ManualPromise();
      useFuncStarted.resolve();
      await this._useFuncFinished;
      if (shouldGenerateStep) {
        afterStep = testInfo._addStep({
          wallTime: Date.now(),
          title: `fixture: ${this.registration.name}`,
          category: 'fixture',
          location: isInternalFixture ? this.registration.location : undefined
        }, testInfo._afterHooksStep);
        mutableStepOnStack.stepId = afterStep.stepId;
      }
    };
    const workerInfo = {
      config: testInfo.config,
      parallelIndex: testInfo.parallelIndex,
      workerIndex: testInfo.workerIndex,
      project: testInfo.project
    };
    const info = this.registration.scope === 'worker' ? workerInfo : testInfo;
    testInfo._timeoutManager.setCurrentFixture(this._runnableDescription);
    const handleError = e => {
      this.failed = true;
      if (!useFuncStarted.isDone()) useFuncStarted.reject(e);else throw e;
    };
    try {
      const result = _utils.zones.preserve(async () => {
        if (!shouldGenerateStep) return await this.registration.fn(params, useFunc, info);
        await testInfo._runAsStep({
          title: `fixture: ${this.registration.name}`,
          category: 'fixture',
          location: isInternalFixture ? this.registration.location : undefined
        }, async step => {
          mutableStepOnStack = step;
          return await this.registration.fn(params, useFunc, info);
        });
      });
      if (result instanceof Promise) this._selfTeardownComplete = result.catch(handleError);else this._selfTeardownComplete = Promise.resolve();
    } catch (e) {
      handleError(e);
    }
    await useFuncStarted;
    if (shouldGenerateStep) {
      var _mutableStepOnStack, _this$_selfTeardownCo;
      (_mutableStepOnStack = mutableStepOnStack) === null || _mutableStepOnStack === void 0 ? void 0 : _mutableStepOnStack.complete({});
      (_this$_selfTeardownCo = this._selfTeardownComplete) === null || _this$_selfTeardownCo === void 0 ? void 0 : _this$_selfTeardownCo.then(() => {
        var _afterStep;
        (_afterStep = afterStep) === null || _afterStep === void 0 ? void 0 : _afterStep.complete({});
      }).catch(e => {
        var _afterStep2;
        (_afterStep2 = afterStep) === null || _afterStep2 === void 0 ? void 0 : _afterStep2.complete({
          error: (0, _util.serializeError)(e)
        });
      });
    }
    testInfo._timeoutManager.setCurrentFixture(undefined);
  }
  async teardown(timeoutManager) {
    if (this._teardownWithDepsComplete) {
      // When we are waiting for the teardown for the second time,
      // most likely after the first time did timeout, annotate current fixture
      // for better error messages.
      this._setTeardownDescription(timeoutManager);
      await this._teardownWithDepsComplete;
      timeoutManager.setCurrentFixture(undefined);
      return;
    }
    this._teardownWithDepsComplete = this._teardownInternal(timeoutManager);
    await this._teardownWithDepsComplete;
  }
  _setTeardownDescription(timeoutManager) {
    this._runnableDescription.phase = 'teardown';
    timeoutManager.setCurrentFixture(this._runnableDescription);
  }
  async _teardownInternal(timeoutManager) {
    if (typeof this.registration.fn !== 'function') return;
    try {
      for (const fixture of this._usages) await fixture.teardown(timeoutManager);
      if (this._usages.size !== 0) {
        // TODO: replace with assert.
        console.error('Internal error: fixture integrity at', this._runnableDescription.title); // eslint-disable-line no-console
        this._usages.clear();
      }
      if (this._useFuncFinished) {
        (0, _util.debugTest)(`teardown ${this.registration.name}`);
        this._setTeardownDescription(timeoutManager);
        this._useFuncFinished.resolve();
        await this._selfTeardownComplete;
        timeoutManager.setCurrentFixture(undefined);
      }
    } finally {
      for (const dep of this._deps) dep._usages.delete(this);
      this.runner.instanceForId.delete(this.registration.id);
    }
  }
}
class FixtureRunner {
  constructor() {
    this.testScopeClean = true;
    this.pool = void 0;
    this.instanceForId = new Map();
  }
  setPool(pool) {
    if (!this.testScopeClean) throw new Error('Did not teardown test scope');
    if (this.pool && pool.digest !== this.pool.digest) {
      throw new Error([`Playwright detected inconsistent test.use() options.`, `Most common mistakes that lead to this issue:`, `  - Calling test.use() outside of the test file, for example in a common helper.`, `  - One test file imports from another test file.`].join('\n'));
    }
    this.pool = pool;
  }
  async teardownScope(scope, timeoutManager) {
    let error;
    // Teardown fixtures in the reverse order.
    const fixtures = Array.from(this.instanceForId.values()).reverse();
    for (const fixture of fixtures) {
      if (fixture.registration.scope === scope) {
        try {
          await fixture.teardown(timeoutManager);
        } catch (e) {
          if (error === undefined) error = e;
        }
      }
    }
    if (scope === 'test') this.testScopeClean = true;
    if (error !== undefined) throw error;
  }
  async resolveParametersForFunction(fn, testInfo, autoFixtures) {
    // Install automatic fixtures.
    const auto = [];
    for (const registration of this.pool.registrations.values()) {
      if (registration.auto === false) continue;
      let shouldRun = true;
      if (autoFixtures === 'all-hooks-only') shouldRun = registration.scope === 'worker' || registration.auto === 'all-hooks-included';else if (autoFixtures === 'worker') shouldRun = registration.scope === 'worker';
      if (shouldRun) auto.push(registration);
    }
    auto.sort((r1, r2) => (r1.scope === 'worker' ? 0 : 1) - (r2.scope === 'worker' ? 0 : 1));
    for (const registration of auto) {
      const fixture = await this.setupFixtureForRegistration(registration, testInfo);
      if (fixture.failed) return null;
    }

    // Install used fixtures.
    const names = getRequiredFixtureNames(fn);
    const params = {};
    for (const name of names) {
      const registration = this.pool.registrations.get(name);
      const fixture = await this.setupFixtureForRegistration(registration, testInfo);
      if (fixture.failed) return null;
      params[name] = fixture.value;
    }
    return params;
  }
  async resolveParametersAndRunFunction(fn, testInfo, autoFixtures) {
    const params = await this.resolveParametersForFunction(fn, testInfo, autoFixtures);
    if (params === null) {
      // Do not run the function when fixture setup has already failed.
      return null;
    }
    return fn(params, testInfo);
  }
  async setupFixtureForRegistration(registration, testInfo) {
    if (registration.scope === 'test') this.testScopeClean = false;
    let fixture = this.instanceForId.get(registration.id);
    if (fixture) return fixture;
    fixture = new Fixture(this, registration);
    this.instanceForId.set(registration.id, fixture);
    await fixture.setup(testInfo);
    return fixture;
  }
  dependsOnWorkerFixturesOnly(fn, location) {
    const names = getRequiredFixtureNames(fn, location);
    for (const name of names) {
      const registration = this.pool.registrations.get(name);
      if (registration.scope !== 'worker') return false;
    }
    return true;
  }
}
exports.FixtureRunner = FixtureRunner;
function getRequiredFixtureNames(fn, location) {
  return (0, _fixtures.fixtureParameterNames)(fn, location !== null && location !== void 0 ? location : {
    file: '<unknown>',
    line: 1,
    column: 1
  }, e => {
    throw new Error(`${(0, _util.formatLocation)(e.location)}: ${e.message}`);
  });
}