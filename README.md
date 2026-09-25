# Library Book Management

Library Book Management is a web application for organizing library records and tracking book activity. It uses a React and Vite frontend, a functional Python FastAPI backend, and PostgreSQL for persistent data.

## Current Features

- Browse a book catalog with title, author, ISBN, publisher, category, year, status, and description details
- Search books by title, author, or ISBN
- Filter catalog records by availability status
- Add, edit, and delete book records through forms
- View detailed information for a selected book
- Track issued books, members, student IDs, issue dates, due dates, and loan status
- Track returned books and return dates
- Filter issued and returned records by status and date range
- Navigate catalog, issued-book, and returned-book records with pagination
- Display the current date and time for the Asia/Manila timezone

## Technology Stack

### Frontend

- React
- Vite
- Luxon
- CSS

### Backend

- Python
- FastAPI
- psycopg
- PostgreSQL

FastAPI provides API endpoints for book, issue, return, member, and catalog operations. The backend uses the functional modules under `models/` for database access and `controllers/` for HTTP request handling.

## Project Structure

```text
Library-Book-Management/
├── controllers/       # Functional HTTP request controllers
├── models/            # PostgreSQL connection and data access functions
├── main.py             # FastAPI application entry point
├── requirements.txt    # Backend dependencies
├── frontend/          # React and Vite application
└── README.md
```

## Running the Frontend

1. Open the frontend directory:

	```bash
	cd frontend
	```

2. Install dependencies:

	```bash
	npm install
	```

3. Start the development server:

	```bash
	npm run dev
	```

4. Open the local URL shown by Vite in the terminal.

## Available Frontend Commands

```bash
npm run dev       # Start the development server
npm run build     # Create a production build
npm run lint      # Run ESLint
npm run preview   # Preview the production build
```

## Running the Backend

1. Install backend dependencies:

	```bash
	pip install -r requirements.txt
	```

2. Apply `schema.sql` to the `pg_default` database:

	```bash
	psql -U postgres -d pg_default -f schema.sql
	```

3. Start FastAPI from the project root:

	```bash
	uvicorn main:app --reload
	```

The default database URL is `postgresql://postgres@localhost:5432/pg_default`. Set `DATABASE_URL` to override it. The frontend uses `http://localhost:8000/api` by default; set `VITE_API_URL` when the API runs elsewhere.

## Project Status

The frontend interface is connected to the database-backed catalog and loan workflows. Authentication and production deployment remain outside the current scope.
