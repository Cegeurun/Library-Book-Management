# Library Book Management

Library Book Management is a web application for organizing library records and tracking book activity. The project is being developed with a React and Vite frontend, with a Python Flask backend and MySQL database planned for the application services and persistent data layer.

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

### Planned Backend

- Python
- Flask
- MySQL

The frontend currently uses sample records while the backend is being prepared. Flask will provide the API for book, issue, return, member, and catalog operations. MySQL will store the application data and support reliable record management.

## Project Structure

```text
Library-Book-Management/
├── controllers/       # Planned backend request and application controllers
├── models/            # Planned database models and data access logic
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

## Planned Backend Work

- Create the Flask application and API routes
- Connect Flask to MySQL
- Replace sample frontend records with API data
- Add database-backed book, member, issue, and return operations
- Add validation and error handling for API requests
- Configure environment variables for database credentials and application settings

## Project Status

The frontend interface and sample data workflows are in place. Backend integration, database schema design, authentication, and production deployment remain planned work.
