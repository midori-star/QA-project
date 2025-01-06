# Prestashop E-Commerce Platform Testing Project

## Overview
This repository contains automated tests for the PrestaShop e-commerce platform implemented as part of the SE302 Software Testing and Maintenance course. The tests are written in TypeScript using Playwright and the test suite includes both smoke and regression tests for different functionalities of the platform.

## Prerequisites
- Node.js installed on your machine
- npm (Node Package Manager)

## Setup
1. Clone the repository to your local machine.
   ```bash
   git clone https://github.com/your-username/QA-Project.git
   cd QA-Project

2. Initialize the project with npm.
    ```bash
    npm init

3. Install Playwright.
     ```bash
     npm install @playwright/test
     npx playwright install

## Running Tests

### Run All Tests 
    
    
    npx playwright test 

### Run All Tests (Headed Mode)
    
    
    npx playwright test --headed
    
### Run All Tests (Headed Mode)
   
    
    npx playwright test --browser=YourBrowserOfChoice
    
### Run Smoke Tests Only
   
    
    npm run tests:smoke
    
    
### Run Regression Tests Only
    
    
    npm run tests:regression
    

## Test Scenarios

### Smoke Tests
    Checkout Page
    Create Account
    Home Page
    Log in/Log out
    Search Item

### Regression Tests
    Address Page
    Category
    Checkout
    Create Account
    LogIn
    Footer
    NavBar
    Orders Track
    Promo Banners
    Search Items

## Thank you

We sincerely appreciate the time and effort of everyone involved in evaluating this project - assistant and professor. Your insights and feedback are invaluable in helping us improve our skills and understanding of software testing. Thank you for your dedication to supporting our learning journey!