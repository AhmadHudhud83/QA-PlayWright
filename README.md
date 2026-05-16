# SauceDemo Automated Testing Framework

## Project Overview
This repository contains a professional end-to-end testing framework for the SauceDemo (Swag Labs) e-commerce platform. Developed using Playwright and TypeScript, the framework demonstrates advanced automation techniques including the Page Object Model (POM), custom fixtures, and global authentication states.

## Core Architecture and Design Patterns
*   **Page Object Model (POM):** The project architecture separates page-specific selectors and actions into dedicated classes located in the `pages/` directory. This ensures high maintainability and reduces code duplication.
*   **Custom Test Fixtures:** A custom fixture implementation (`pages/fixtures.ts`) is used to extend the base Playwright test. This allows for automated injection of Page Objects into test cases, providing a cleaner and more readable test structure.
*   **Global Authentication (Browser State):** To fulfill the requirement of avoiding repeated logins, a global setup routine (`tests/auth/setup.ts`) authenticates the user once and saves the storage state to a JSON file. All subsequent tests reuse this state to start sessions in an authenticated state.
*   **Parameterized Testing:** Data-driven scenarios are implemented using external JSON files, allowing the same test logic to validate multiple user profiles and their respective expected outcomes.

## Test Coverage
The framework provides comprehensive coverage across the following functional areas:
*   **Authentication:** Validates standard and locked-out user scenarios through data-driven testing.
*   **Inventory Management:** Verifies product sorting (A-Z and Price High-to-Low) and data consistency between the product list and detail pages.
*   **Cart Logic:** Validates adding and removing single and multiple items, including sequential removal and cart status verification.
*   **Checkout Workflow:** Complete end-to-end flow from information entry to order completion, including negative testing for form validation errors.
*   **Session Integrity:** Tests for session termination (Logout) and persistence of cart items during page reloads.
*   **Accessibility (a11y):** Automated audits using `@axe-core/playwright` to scan for WCAG compliance violations.
*   **Visual Regression:** Snapshot testing to ensure UI consistency across different browser engines.

## Technical Stack
*   **Language:** TypeScript
*   **Testing Framework:** Playwright
*   **Accessibility Engine:** Axe-core
*   **Environment Management:** Dotenv

## Project Structure
```text
.
├── pages/                # Page Object Models and Custom Fixtures
├── tests/                # Feature-specific test specifications
│   └── auth/             # Authentication setup for browser state
├── test-data/            # External JSON data sets
├── playwright.config.ts  # Framework and multi-browser configuration
├── .env                  # Secure environment variables
└── README.md             # Project documentation
```

## Setup and Installation

1. **Install Dependencies:**
   Execute the following command to install the necessary Node.js packages:
   ```bash
   npm install
   ```

2. **Install Browser Binaries:**
   Install the required browser engines for Playwright:
   ```bash
   npx playwright install
   ```

3. **Configure Environment Variables:**
   Ensure a `.env` file exists in the root directory with the following configuration:
   ```env
   URL=https://www.saucedemo.com/
   USER_NAME=standard_user
   PASSWORD=secret_sauce
   ```

## Execution Instructions

*   **Run All Tests (Headless Mode):**
    ```bash
    npx playwright test
    ```

*   **Run Specific Feature:**
    ```bash
    npx playwright test tests/cart.spec.ts
    ```

*   **Run Tests in UI Mode (Interactive):**
    ```bash
    npx playwright test --ui
    ```

*   **View Test Report:**
    ```bash
    npx playwright show-report
    ```

*   **Update Visual Snapshots:**
    ```bash
    npx playwright test --update-snapshots
    ```

 
**Authors:** Ahmad Hudhud & Omar Baker