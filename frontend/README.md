# Military Asset Management System

A comprehensive React-based web application for tracking and managing military assets across multiple bases. This system provides real-time inventory management, transfer tracking, personnel assignments, and expenditure monitoring.

## Overview

This application enables military organizations to maintain accurate records of asset movements, assignments, and expenditures across different bases. Built with React, TypeScript, and Material-UI, it offers an intuitive interface for managing complex asset logistics.

## Features

### Dashboard

- Real-time metrics display with filterable views
- Key performance indicators:
  - Opening Balance: Starting inventory for the period
  - Closing Balance: Current inventory levels
  - Net Movement: Overall change in inventory
  - Assigned: Total assets assigned to personnel
  - Expended: Total assets consumed or disposed
- Advanced filtering by base, asset type, and date range
- Visual card-based metrics for quick insights

### Purchases Management

- Record new asset purchases with detailed information
- Track purchase history across all bases
- Filter purchases by:
  - Base location
  - Asset type
  - Date range
- Paginated data grid with sortable columns
- Real-time form validation

### Transfers Management

- Create inter-base asset transfers
- Track asset movement between locations
- Validation to prevent same-base transfers
- Comprehensive filtering options:
  - Source base (from)
  - Destination base (to)
  - Asset type
  - Date range
- Complete transfer history with audit trail

### Assignments & Expenditures

- Dual-tab interface for managing two distinct operations:

  **Assignments Tab:**

  - Assign assets to specific personnel
  - Track personnel name, base, asset type, and quantity
  - Monitor all active assignments

  **Expenditures Tab:**

  - Record asset consumption or disposal
  - Document reasons for expenditure
  - Track expenditure patterns by base and asset type

- Unified filtering across both tabs
- Separate data grids for clear visualization

## Technology Stack

- React 19.2.0
- TypeScript 4.9.5
- Material-UI (MUI) 7.3.4
- React Router DOM 7.9.4
- Axios 1.12.2
- MUI X Data Grid 8.14.1

## Project Structure

```
src/
├── api/
│   └── client.ts              # Axios API client configuration
├── components/
│   ├── AssignmentExpenditureForm.tsx  # Form for assignments/expenditures
│   ├── NavBar.tsx             # Navigation component
│   ├── PurchaseForm.tsx       # Purchase creation form
│   └── TransferForm.tsx       # Transfer creation form
├── pages/
│   ├── AssignmentsExpenditures.tsx  # Assignments & expenditures page
│   ├── Dashboard.tsx          # Main dashboard with metrics
│   ├── Purchases.tsx          # Purchases management page
│   └── Transfers.tsx          # Transfers management page
├── types/
│   └── index.ts               # TypeScript type definitions
├── App.tsx                    # Main application component
└── index.tsx                  # Application entry point
```

## Components

### Forms

- **PurchaseForm**: Captures base, asset type, quantity, and date for new purchases
- **TransferForm**: Manages asset transfers between bases with validation
- **AssignmentExpenditureForm**: Tabbed form handling both personnel assignments and expenditure records

### Pages

- **Dashboard**: Aggregated metrics with dynamic filtering
- **Purchases**: Full CRUD interface for purchase records
- **Transfers**: Transfer management with comprehensive filtering
- **AssignmentsExpenditures**: Combined interface for assignments and expenditures

### Navigation

- **NavBar**: Responsive navigation bar with routing to all major sections

## Data Models

### Base

- Military base/location entity
- Fields: id, name

### AssetType

- Category of military assets
- Fields: id, name

### Purchase

- Asset acquisition record
- Fields: id, base, asset_type, quantity, date

### Transfer

- Inter-base asset movement
- Fields: id, from_base, to_base, asset_type, quantity, date

### Assignment

- Asset assignment to personnel
- Fields: id, personnel_name, base, asset_type, quantity, date

### Expenditure

- Asset consumption/disposal record
- Fields: id, base, asset_type, quantity, date, reason

## Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher) or yarn

## Installation

1. Clone the repository:

   ```bash
   git clone git@github.com:pushsontakke/military_assets_management.git
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

   Or using yarn:

   ```bash
   yarn install
   ```

3. Create a `.env` file in the root directory:

   ```
   REACT_APP_API_URL=http://localhost:8000/api
   ```

   Replace with your actual backend API URL.

## Running the Application

### Development Mode

Start the development server with hot reloading:

```bash
npm start
```

Or with yarn:

```bash
yarn start
```

The application will automatically open at [http://localhost:3000](http://localhost:3000)

### Production Build

Create an optimized production build:

```bash
npm run build
```

Or with yarn:

```bash
yarn build
```

The build artifacts will be stored in the `build/` directory.

### Running Tests

Run the test suite in interactive watch mode:

```bash
npm test
```

Or with yarn:

```bash
yarn test
```

### Serving Production Build Locally

After building, you can serve the production build locally:

```bash
npx serve -s build
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## Available Scripts

### `npm start`

Runs the app in development mode with hot reloading.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder. The build is optimized and minified.

### `npm run eject`

Ejects from Create React App (one-way operation). Use with caution.

## API Integration

The application uses Axios for API communication. The base URL is configured via environment variables. All API calls include credentials for authentication.

API endpoints:

- `/bases/` - Base management
- `/asset-types/` - Asset type management
- `/purchases/` - Purchase records
- `/transfers/` - Transfer records
- `/assignments/` - Assignment records
- `/expenditures/` - Expenditure records
- `/dashboard/` - Dashboard metrics

## Key Features

- Responsive design for desktop and mobile devices
- Real-time data validation
- Advanced filtering and search capabilities
- Paginated data grids for performance
- Error handling with user-friendly messages
- Date-based filtering for historical analysis
- Cross-base asset tracking
- Personnel assignment tracking
- Expenditure reason documentation

<!-- ## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest) -->
<!--

## License

This project is private and proprietary. -->
