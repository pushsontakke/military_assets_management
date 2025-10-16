# Military Asset Management System

A Django REST API application for managing military assets across multiple bases. Track purchases, transfers, assignments, expenditures, and get real-time dashboard metrics.

## Features

- **Asset Management**: Track military assets by type and base location
- **Purchase Tracking**: Record asset purchases with date and quantity
- **Transfer Management**: Transfer assets between military bases
- **Personnel Assignments**: Assign assets to personnel
- **Expenditure Tracking**: Log asset expenditures with reasons
- **Dashboard Metrics**: Real-time analytics with filtering capabilities
- **Transaction Logging**: Audit trail for all asset movements
- **RESTful API**: Full CRUD operations with filtering support
- **Interactive API Documentation**: Auto-generated Swagger/OpenAPI docs

## Tech Stack

- **Framework**: Django 5.2.7
- **API**: Django REST Framework 3.16.1
- **Database**: PostgreSQL (via psycopg2-binary)
- **Documentation**: drf-spectacular (OpenAPI 3.0)
- **CORS**: django-cors-headers
- **Environment Management**: python-decouple, python-dotenv

## Prerequisites

- Python 3.8+
- PostgreSQL database (or free Neon PostgreSQL account)
- pip (Python package manager)

## Installation

### 1. Clone the repository

```bash
git clone git@github.com:pushsontakke/military_assets_management.git
cd backend
```

### 2. Create and activate virtual environment

```bash
python -m venv backend_venv
source backend_venv/bin/activate  # On Windows: backend_venv\Scripts\activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Set up PostgreSQL Database

This project uses **Neon PostgreSQL** (free serverless PostgreSQL).

1. Sign up for a free account at [neon.tech](https://neon.tech)
2. Create a new project
3. Copy your connection string (it will look like: `postgresql://username:password@ep-xxx.region.aws.neon.tech/dbname?sslmode=require`)

Alternatively, you can use any PostgreSQL database (local or cloud).

### 5. Configure environment variables

Create a `.env` file in the project root:

```env
SECRET_KEY=your-secret-key-here
DEBUG=True
DATABASE_URL=postgresql://username:password@ep-xxx.region.aws.neon.tech/dbname?sslmode=require
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:8000
```

Replace the `DATABASE_URL` with your Neon PostgreSQL connection string.

### 6. Run database migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

### 7. Create a superuser (optional)

```bash
python manage.py createsuperuser
```

### 8. Run the development server

```bash
python manage.py runserver
```

<!-- The API will be available at `http://localhost:8000/` -->

<!-- ## API Documentation

### Interactive Documentation

Once the server is running, access the interactive API documentation:

- **Swagger UI**: http://localhost:8000/docs/
- **OpenAPI Schema**: http://localhost:8000/schema/ -->

### Base URL

```
http://localhost:8000/api/
```

### Endpoints

#### Bases

- `GET /api/bases/` - List all military bases
- `GET /api/bases/{id}/` - Retrieve a specific base

#### Asset Types

- `GET /api/asset-types/` - List all asset types
- `GET /api/asset-types/{id}/` - Retrieve a specific asset type

#### Purchases

- `GET /api/purchases/` - List all purchases
- `POST /api/purchases/` - Create a new purchase
- `GET /api/purchases/{id}/` - Retrieve a specific purchase
- `PUT /api/purchases/{id}/` - Update a purchase
- `PATCH /api/purchases/{id}/` - Partially update a purchase
- `DELETE /api/purchases/{id}/` - Delete a purchase

**Query Parameters**: `date`, `base`, `asset_type`

**Request Body Example**:

```json
{
  "base": 1,
  "asset_type": 1,
  "quantity": 100,
  "date": "2025-10-16",
  "created_by": 1
}
```

#### Transfers

- `GET /api/transfers/` - List all transfers
- `POST /api/transfers/` - Create a new transfer
- `GET /api/transfers/{id}/` - Retrieve a specific transfer
- `PUT /api/transfers/{id}/` - Update a transfer
- `PATCH /api/transfers/{id}/` - Partially update a transfer
- `DELETE /api/transfers/{id}/` - Delete a transfer

**Query Parameters**: `date`, `from_base`, `to_base`, `asset_type`

**Request Body Example**:

```json
{
  "from_base": 1,
  "to_base": 2,
  "asset_type": 1,
  "quantity": 50,
  "date": "2025-10-16",
  "created_by": 1
}
```

#### Assignments

- `GET /api/assignments/` - List all assignments
- `POST /api/assignments/` - Create a new assignment
- `GET /api/assignments/{id}/` - Retrieve a specific assignment
- `PUT /api/assignments/{id}/` - Update an assignment
- `PATCH /api/assignments/{id}/` - Partially update an assignment
- `DELETE /api/assignments/{id}/` - Delete an assignment

**Query Parameters**: `date`, `base`, `asset_type`

**Request Body Example**:

```json
{
  "personnel_name": "John Doe",
  "base": 1,
  "asset_type": 1,
  "quantity": 10,
  "date": "2025-10-16",
  "created_by": 1
}
```

#### Expenditures

- `GET /api/expenditures/` - List all expenditures
- `POST /api/expenditures/` - Create a new expenditure
- `GET /api/expenditures/{id}/` - Retrieve a specific expenditure
- `PUT /api/expenditures/{id}/` - Update an expenditure
- `PATCH /api/expenditures/{id}/` - Partially update an expenditure
- `DELETE /api/expenditures/{id}/` - Delete an expenditure

**Query Parameters**: `date`, `base`, `asset_type`

**Request Body Example**:

```json
{
  "base": 1,
  "asset_type": 1,
  "quantity": 5,
  "date": "2025-10-16",
  "reason": "Training exercise",
  "created_by": 1
}
```

#### Dashboard Metrics

- `GET /api/dashboard/` - Get aggregated metrics

**Query Parameters**:

- `base` - Filter by base ID
- `asset_type` - Filter by asset type ID
- `date_from` - Start date (YYYY-MM-DD)
- `date_to` - End date (YYYY-MM-DD)

**Response Example**:

```json
{
  "opening_balance": 0,
  "closing_balance": 135,
  "net_movement": 150,
  "assigned": 10,
  "expended": 5
}
```

## Data Models

### Base

- `name` - Unique base name

### AssetType

- `name` - Unique asset type name

### Asset

- `asset_type` - Foreign key to AssetType
- `base` - Foreign key to Base
- `quantity` - Positive integer
- `created_at` - Auto timestamp

### Purchase

- `base` - Foreign key to Base
- `asset_type` - Foreign key to AssetType
- `quantity` - Positive integer
- `date` - Date of purchase
- `created_by` - Foreign key to User

### Transfer

- `from_base` - Source base
- `to_base` - Destination base
- `asset_type` - Foreign key to AssetType
- `quantity` - Positive integer
- `date` - Transfer date
- `created_by` - Foreign key to User

### Assignment

- `personnel_name` - Name of personnel
- `base` - Foreign key to Base
- `asset_type` - Foreign key to AssetType
- `quantity` - Positive integer
- `date` - Assignment date
- `created_by` - Foreign key to User

### Expenditure

- `base` - Foreign key to Base
- `asset_type` - Foreign key to AssetType
- `quantity` - Positive integer
- `date` - Expenditure date
- `reason` - Text description
- `created_by` - Foreign key to User

### TransactionLog

- `action` - PURCHASE, TRANSFER, ASSIGN, or EXPEND
- `details` - JSON field with transaction details
- `timestamp` - Auto timestamp
- `user` - Foreign key to User

## Admin Panel

Access the Django admin panel at `http://localhost:8000/admin/` to manage data through a web interface.

## Development

### Running Tests

```bash
python manage.py test
```

### Creating Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

### Collecting Static Files

```bash
python manage.py collectstatic
```

## Deployment Considerations

- Set `DEBUG=False` in production
- Use a strong `SECRET_KEY`
- Configure `ALLOWED_HOSTS` properly
- Use environment variables for sensitive data
- Set up proper CORS origins
- Use a production-grade WSGI server (gunicorn, uWSGI)
- Neon PostgreSQL automatically handles SSL connections and scaling
- Set up SSL/TLS certificates for your application
- Implement rate limiting and authentication as needed

### Database: Neon PostgreSQL

This project uses **Neon PostgreSQL**, a serverless PostgreSQL platform with:

- Free tier with 0.5 GB storage
- Automatic scaling and connection pooling
- Built-in SSL/TLS encryption
- No server management required
- Instant database branching for development

The connection is configured via the `DATABASE_URL` environment variable using `dj-database-url` for easy parsing.
<!-- 
## License

[Add your license information here]

## Contributing

[Add contribution guidelines here]

## Support

[Add support contact information here] -->
