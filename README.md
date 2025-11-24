# Finance Assistant - MERN Stack

This is a full-stack web application designed to help users track their income and expenses. It provides a user-friendly interface to manage personal finances, visualize data through charts, and gain insights into spending habits.

## Features

- **User Authentication:** Secure user registration and login system.
- **Dashboard:** A central hub to view a summary of your financial activity.
- **Income Tracking:** Add, view, and manage your sources of income.
- **Expense Tracking:** Record, categorize, and monitor your expenses.
- **Data Visualization:** Interactive charts to visualize income vs. expenses.
- **Responsive Design:** The application is designed to work on various screen sizes.

## Tech Stack

### Backend

- **Node.js:** JavaScript runtime environment.
- **Express.js:** Web application framework for Node.js.
- **MongoDB:** NoSQL database for storing application data.
- **Mongoose:** Object Data Modeling (ODM) library for MongoDB.
- **JWT (JSON Web Tokens):** For secure user authentication.
- **Bcrypt:** For hashing user passwords.
- **Multer:** For handling file uploads.

### Frontend

- **React.js:** A JavaScript library for building user interfaces.
- **Vite:** A fast build tool for modern web development.
- **React Router:** For handling client-side routing.
- **Tailwind CSS:** A utility-first CSS framework for styling.
- **Axios:** A promise-based HTTP client for making API requests.
- **Chart.js & Recharts:** For creating interactive charts.

## Prerequisites

- Node.js (v14 or later)
- npm (Node Package Manager)
- MongoDB (local installation or a cloud service like MongoDB Atlas)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### 1. Clone the repository

```bash
git clone https://github.com/abhishekkamble12/FInance_Assitant_mern.git
cd FInance_Assitant_mern
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory and add the following environment variables:

```
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the backend server:

```bash
npm run dev
```

The backend will be running on `http://localhost:8000`.

### 3. Frontend Setup

```bash
cd ../frontend/Finance
npm install
```

Start the frontend development server:

```bash
npm run dev
```

The frontend will be running on `http://localhost:5173` (or another port if 5173 is in use).

### 4. Access the Application

### 4. Access the Application

Open your web browser and navigate to the frontend URL to use the application.
