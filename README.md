# MyTimeTable

**MyTimeTable** is a web-based application that helps users manage and organize their daily schedule efficiently. It allows users to create, edit, and delete tasks and events while keeping track of their time. The app is built with the MERN stack (MongoDB, Express, React, Node.js) for the backend and frontend and is designed to be responsive and easy to use.



## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)



## Features

- **Create, Edit, and Delete Timetable:** Users can create, modify, and remove their daily tasks and schedules.
- **User Authentication:** Secure login and registration for managing user-specific data.
- **Responsive Design:** The app is optimized for both desktop and mobile devices.
- **Time Management:** Helps track and organize your daily events.
- **Simple and Clean UI:** Intuitive user interface for easy navigation.



## Tech Stack

- **Frontend:**
  - React
  - Vite
  - React Router
  - Tailwind CSS

- **Backend:**
  - Node.js
  - Express
  - MongoDB
  - JWT for authentication

- **Development Tools:**
  - Vite for fast bundling
  - bcryptjs for password hashing
  - jsonwebtoken for JWT authentication
  - dotenv for managing environment variables



## Installation

To get started with **MyTimeTable**, follow these steps:

### 1. Clone the repository:

```bash
git clone https://github.com/Shahzad-Ali-44/MyTimeTable.git
cd MyTimeTable
```

### 2. Install dependencies for both frontend and backend:

- **Frontend:**

  Navigate to the `client` directory and install the frontend dependencies:

  ```bash
  cd client
  npm install
  ```

- **Backend:**

  Navigate to the `server` directory and install the backend dependencies:

  ```bash
  cd ../server
  npm install
  ```

### 3. Set up environment variables:

In both the frontend (`client`) and backend (`server`), create `.env` files and add the following variables:

#### For the backend:

```env
MONGO_URI=your-mongo-db-uri
JWT_SECRET=your-jwt-secret
PORT=5000
```

#### For the frontend:

```env
VITE_MyTimeTable_BACKEND_UR=http://localhost:5000
```

### 4. Start the development server:

- **Backend:**

  Navigate to the `server` directory and run:

  ```bash
  node index.js
  ```

- **Frontend:**

  Navigate to the `client` directory and run:

  ```bash
  npm run dev
  ```

Now you can visit the app in your browser at `http://localhost:5173`.



## Usage

- Register or log in to start using MyTimeTable.
- Create a timetable by adding tasks or events to your schedule.
- Edit or delete tasks as needed.
- The timetable is automatically saved and displayed when you log in.





## Contributing

Contributions are welcome! Feel free to fork the repository, make improvements, and submit a pull request.



## 📜 License

This project is licensed under the [MIT License](LICENSE).


*⏰ MyTimeTable - Organize Your Day, Achieve Your Goals.*
