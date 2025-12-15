# E-commerce Application

A modern, full-stack e-commerce platform built with **FastAPI** (Backend) and **React + Vite** (Frontend). This application provides a seamless shopping experience with features like product browsing, detailed product views, user authentication, and a shopping cart.

## 🚀 Features

- **Product Catalog**: Browse a wide range of products with filtering and detailed views.
- **User Authentication**: Secure sign-up and login functionality.
- **Shopping Cart**: Add items to cart, manage quantities, and review selections.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Background Tasks**: Automated maintenance tasks (e.g., cleaning up old guest sessions).

## 🛠️ Tech Stack

### Backend
- **Framework**: [FastAPI](https://fastapi.tiangolo.com/)
- **Database ORM**: [SQLAlchemy](https://www.sqlalchemy.org/)
- **Authentication**: JWT (JSON Web Tokens) with `python-jose` and `passlib`
- **Database**: PostgreSQL (configured via `psycopg2-binary`)

### Frontend
- **Framework**: [React](https://react.dev/) (v19)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Routing**: [React Router](https://reactrouter.com/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Styling**: CSS3
- **Icons**: FontAwesome

## 📂 Project Structure

```
├── backend/                # FastAPI backend application
│   ├── app/                # Application source code
│   │   ├── routes/         # API route definitions
│   │   ├── models.py       # Database models
│   │   ├── schemas.py      # Pydantic schemas
│   │   └── ...
│   ├── tests/              # Backend tests
│   └── requirements.txt    # Python dependencies
├── frontend/               # React frontend application
│   ├── src/                # Source code
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React Context (e.g., Cart)
│   │   └── ...
│   └── package.json        # Node.js dependencies
└── data/                   # Data dumps and scraper scripts
```

## 🏁 Getting Started

Follow these instructions to set up the project locally.

### Prerequisites

- **Python** (3.8 or higher)
- **Node.js** (16 or higher) and **npm**
- **PostgreSQL** (Recommended) or SQLite

### Backend Setup

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```

2.  Create a virtual environment:
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    ```

3.  Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```

4.  **Configure Environment Variables:**
    Create a `.env` file in the `backend/` directory and add your database URL.
    
    Example `.env`:
    ```env
    DATABASE_URL=postgresql://user:password@localhost/dbname
    # Or for SQLite:
    # DATABASE_URL=sqlite:///./sql_app.db
    ```

5.  Start the server:
    ```bash
    uvicorn app.main:app --reload
    ```
    The backend API will be available at `http://localhost:8000`.
    Interactive API docs are at `http://localhost:8000/docs`.

### Frontend Setup

1.  Navigate to the frontend directory:
    ```bash
    cd frontend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

## 🧪 Running Tests

To run the backend tests:

```bash
cd backend
pytest
```

## 📄 License

This project is licensed under the MIT License.
