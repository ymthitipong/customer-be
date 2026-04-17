# Customer Backend

NestJS backend service for Customer Information

---

## Requirements

- Node.js version 20
- Yarn
- PostgreSQL version 15
- Docker & Docker Compose (if running with Docker)

---

## Local

### Setup (first time only)

```bash
yarn install
cp .env.example.local .env
docker compose up postgres -d
yarn migration:up
yarn seed:up
```

### Run

```bash
yarn start:dev      # development (watch mode)
yarn build && yarn start:prod  # production
```

Server will be running at `http://localhost:8080`

---

## Docker

### Setup (first time only)

```bash
cp .env.example.docker .env
docker compose up -d --build
docker compose exec api yarn migration:up
docker compose exec api yarn seed:up
```

### Run

```bash
docker compose up -d
```

### Stop

```bash
docker compose down       # keep volumes
docker compose down -v    # remove volumes
```

---

## Database Profile

### Table: `customer`

| Column | Type | Description |
|---|---|---|
| `id` | integer | Primary key (auto increment) |
| `name` | text | Customer name |
| `company` | text | Company name |
| `initials` | text | Customer initials |
| `email` | text | Email address |
| `phone` | text | Phone number |
| `salesperson` | text | Assigned salesperson |
| `credit_status` | text | Credit status (default: `No Credit`) |
| `status` | text | Customer status (default: `Active`) |
| `total_spend` | decimal(12,2) | Total spending amount |
| `number_of_purchases` | integer | Number of purchases |
| `active_since` | date | Date customer became active |
| `last_activity` | timestamptz | Last activity timestamp |
| `recent_activity` | jsonb | Recent activity logs `[{ action, time }]` |
| `created_at` | timestamptz | Record created timestamp |
| `updated_at` | timestamptz | Record updated timestamp |

---

## API Spec

Base URL: `http://localhost:8080`

### `GET /health-check`
Check if the server is running.

Example Response: `200 OK`

---

### `POST /api/login` (Mock API)
Mock login endpoint, always returns success.

| Field | Type | Required |
|---|---|---|
| `username` | string | yes |
| `password` | string | yes |

Example Response:
```json
{ "success": true }
```

---

### `GET /api/customers/:id`
Get a single customer by ID.

Example Response:
```json
{
  "object": "customer",
  "id": 1,
  "name": "John Doe",
  "company": "Acme Corp",
  "initials": "JD",
  "active_since": "2023-01-01",
  "email": "john@example.com",
  "phone": "0812345678",
  "salesperson": "Jane",
  "credit_status": "No Credit",
  "status": "Active",
  "total_spend": 50000.00,
  "number_of_purchases": 10,
  "last_activity": "2024-01-01T00:00:00.000Z",
  "recent_activity": [{ "action": "Purchase", "time": "2024-01-01T00:00:00.000Z", "displayTime": "3 months ago" }]
}
```

---

### `GET /api/customers`
Search and list customers with filtering, sorting, and pagination.

| Parameter | Type | Default | Description |
|---|---|---|---|
| `name` | string | - | Search by name |
| `company` | string | - | Search by company |
| `salesperson` | string | - | Search by salesperson |
| `order` | string | `name_asc` | Sort order |
| `limit` | integer | `20` (max 100) | Results per page |
| `page` | integer | `1` | Page number |

> At least one of `name`, `company`, or `salesperson` is required.

> Available `order` values: `name_asc`, `name_desc`, `total_spend_asc`, `total_spend_desc`, `number_of_purchases_asc`, `number_of_purchases_desc`, `status_asc`, `status_desc`, `last_activity_asc`, `last_activity_desc`

Example Response:
```json
{
  "object": "list",
  "page": 1,
  "limit": 20,
  "order": "name_asc",
  "total": 999,
  "data": [{ "object": "customer", "id": 1, "name": "John Doe", "..." : "..." }]
}
```

---

## How the mock data was generated

Seed file: `database/seed/1776239840000.insert-customers.ts`

Generates **1,000 mock customer records** and inserts them into the `customer` table. Each record is built from randomly selected or generated values as follows:

| Field | How it's generated |
|---|---|
| `name` | Random first name (50 options) + last name (30 options) |
| `initials` | First character of first name + last name |
| `company` | Random pick from 30 predefined company names |
| `email` | Random 10-character alphanumeric string + `@mail.com` |
| `phone` | Random prefix (`06`, `08`, `09`) + 8-digit number |
| `salesperson` | Random pick from 30 predefined salesperson names |
| `credit_status` | Random pick from `No Credit`, `Good Credit`, `Poor Credit` |
| `status` | Random pick from `Active`, `Inactive` |
| `total_spend` | Random number between 1,000–100,000 |
| `number_of_purchases` | Random number between 1–50 |
| `active_since` | Random date between 2023-01-01 and 2025-01-01 |
| `last_activity` | Random date between 2026-01-01 and now |
| `recent_activity` | 1–5 activity entries, each up to 2 hours before the previous one. Actions: `Payment received`, `Generate Report`, `Receive Email`, `Subscribed Promotion`, `Update Profile`, `Update Billing` |