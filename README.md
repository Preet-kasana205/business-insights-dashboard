# Business Insights Dashboard

A full-stack web application that collects business listing data, stores it in MySQL, exposes it through a FastAPI backend, and visualizes it on an interactive React dashboard using Recharts.

Built as part of an internship assignment.

---

## Overview

This project demonstrates an end-to-end data pipeline:

1. **Data Collection** — Business listing data is gathered from two sources: real data scraped from a Wikipedia companies list (using `requests` + `BeautifulSoup`), and realistic supplementary mock data (to reliably reach 500+ records, since many commercial business directories block automated scraping).
2. **Storage** — All listings are stored in a MySQL database in a single table, `listing_master`.
3. **API Layer** — A FastAPI backend exposes REST endpoints to insert listings and to fetch aggregated statistics (city-wise, category-wise, and source-wise counts).
4. **Dashboard** — A React (Vite) frontend consumes these APIs and displays the data through summary cards, bar charts (via Recharts), and a table of the latest listings.

### Tech Stack

- **Frontend:** React (Vite), Axios, Recharts
- **Backend:** FastAPI, SQLAlchemy, Pydantic, Uvicorn
- **Database:** MySQL
- **Package Management:** `uv` (Python), `npm` (JavaScript)
- **Scraping:** `requests`, `BeautifulSoup4`

---

## Project Structure

```
business-insights-dashboard/
├── backend/
│   ├── app/
│   │   ├── main.py          # FastAPI app entry point
│   │   ├── database.py      # MySQL connection setup
│   │   ├── models.py        # SQLAlchemy ORM models
│   │   ├── schemas.py       # Pydantic request/response schemas
│   │   ├── crud.py          # Database query functions
│   │   ├── scraper.py       # Scraping + mock data generation
│   │   └── routes/
│   │       ├── listings.py  # Insert / read listings endpoints
│   │       └── dashboard.py # Aggregated statistics endpoints
│   ├── seed_data.py         # One-time script to populate the database
│   ├── pyproject.toml
│   └── .env                 # Database credentials (not committed)
├── frontend/
│   └── src/
│       ├── components/
│       │   ├── SummaryCard.jsx
│       │   ├── ListingsBarChart.jsx
│       │   └── ListingsTable.jsx
│       ├── api.js           # Axios API wrapper
│       ├── App.jsx
│       └── App.css
├── database.sql             # Database + table creation script
└── README.md
```

---

## Database Setup

1. Log into MySQL:
   ```bash
   mysql -u root -p
   ```

2. Run the schema script:
   ```bash
   source database.sql;
   ```
   Or copy-paste its contents directly into your MySQL client. This creates the `business_dashboard` database and the `listing_master` table.

### `listing_master` Table Schema

| Column         | Type      | Notes                          |
|----------------|-----------|---------------------------------|
| id             | INT       | Primary key, auto-increment    |
| business_name  | VARCHAR(255) | Required                    |
| category       | VARCHAR(100) | Optional                    |
| city           | VARCHAR(100) | Optional                    |
| address        | VARCHAR(500) | Optional                    |
| phone          | VARCHAR(20)  | Optional                    |
| source         | VARCHAR(100) | Optional                    |
| created_at     | TIMESTAMP | Auto-set on insert             |

---

## Backend Setup & Running

This project uses [`uv`](https://docs.astral.sh/uv/) for Python dependency management.

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Create a `.env` file with your MySQL credentials:
   ```
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_HOST=localhost
   DB_PORT=3306
   DB_NAME=business_dashboard
   ```

3. Install dependencies:
   ```bash
   uv add fastapi "uvicorn[standard]" sqlalchemy pymysql pydantic python-dotenv requests beautifulsoup4
   ```

4. Run the server:
   ```bash
   uv run uvicorn app.main:app --reload
   ```

5. The API will be live at `http://127.0.0.1:8000`, with interactive docs at `http://127.0.0.1:8000/docs`.

### Seeding the Database (500+ listings)

With the backend server running, in a separate terminal:

```bash
cd backend
uv run python seed_data.py
```

This scrapes real company data from Wikipedia, generates additional realistic mock listings, and inserts 550 total records via the API.

---

## Frontend Setup & Running

1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open `http://localhost:5173` in your browser.

> **Note:** Both the backend (port 8000) and frontend (port 5173) must be running simultaneously, in separate terminals, for the dashboard to load data.

---

## API Documentation

### Listings

| Method | Endpoint       | Description                          |
|--------|----------------|---------------------------------------|
| POST   | `/listings/`   | Insert a new business listing         |
| GET    | `/listings/`   | Get listings (supports `skip`, `limit` query params) |

**Example request body for `POST /listings/`:**
```json
{
  "business_name": "Sharma Electronics",
  "category": "Electronics",
  "city": "Delhi",
  "address": "123 Main Market",
  "phone": "9876543210",
  "source": "ManualEntry"
}
```

### Dashboard (Aggregated Stats)

| Method | Endpoint                  | Description                    |
|--------|----------------------------|--------------------------------|
| GET    | `/dashboard/total`         | Total number of listings       |
| GET    | `/dashboard/city-wise`     | Listing count grouped by city  |
| GET    | `/dashboard/category-wise` | Listing count grouped by category |
| GET    | `/dashboard/source-wise`   | Listing count grouped by source |

Full interactive documentation (with "try it out" functionality) is available at `http://127.0.0.1:8000/docs` while the backend is running.

---

## Dashboard Features

- **Summary cards** — Total Listings, Total Cities, Total Categories, Total Sources
- **Bar charts** — City-wise, category-wise, and source-wise listing distribution, each color-coded
- **Latest Listings table** — Shows the 10 most recently added listings
- **Fully responsive** — Adapts from a 4-column desktop layout down to a single column on mobile



## Challenges Faced

Building this project involved the usual real-world challenges of a scraping + full-stack project:

- Many commercial business directory sites actively block automated scraping or require JavaScript rendering, which isn't accessible via simple `requests` + `BeautifulSoup`. This was solved by combining a small amount of real scraped data (from a static, scraper-friendly Wikipedia page) with a realistic mock data generator to reliably reach 500+ records.
- Scraping required inspecting the target page's actual HTML structure to correctly identify which table columns held the relevant data, rather than assuming column positions in advance.
- Ensuring random data generation produced an even, representative spread across all cities (rather than relying purely on random chance) required a small adjustment to the generation logic.
- Environment and tooling setup (Python virtual environment via `uv`, Node/Vite project scaffolding) required some troubleshooting to get exactly right on Windows.

---

## Future Improvements

- Add authentication for the insert endpoint
- Add filtering/search on the dashboard (by city, category, or source)
- Add pagination controls to the Latest Listings table
- Deploy backend and frontend (e.g., via Render) for a live demo link
