# MyTimeTable

**MyTimeTable** is a web-based application that helps users manage and organize their daily schedule efficiently. It allows users to create, edit, and delete tasks while keeping track of their time. The app is built with the MERN stack (MongoDB, Express, React, Node.js) for the backend and frontend and is designed to be responsive and easy to use.


## New Feature: 🔔 Notifications Enabled
Added push notification system using Firebase Cloud Messaging (FCM).
Users now receive task notifications both in foreground and background, powered by Firebase.


## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)



## Features

- **Create, Edit, and Delete Timetable:** Users can create, modify, and remove their daily tasks and schedules.
- **User Authentication:** Secure login and registration for managing user-specific data.
- **Responsive Design:** The app is optimized for both desktop and mobile devices.
- **Time Management:** Helps track and organize your daily events.
- **Firebase Notifications:** Real-time notifications for upcoming tasks (foreground and background).
- **Simple and Clean UI:** Intuitive user interface for easy navigation.



## Tech Stack

- **Frontend:**
  - React
  - Vite
  - React Router
  - Tailwind CSS
  - Firebase Cloud Messaging

- **Backend:**
  - Node.js
  - Express
  - MongoDB
  - JWT
  - Firebase Admin SDK

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
MONGOURL=your-mongo-db-uri
SECRET_KEY=your-jwt-secret
PORT=8000
FIREBASE_TYPE=your-firebase-type
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_PRIVATE_KEY_ID=your-firebase-private-key-id
FIREBASE_PRIVATE_KEY=your-firebase-private-key
FIREBASE_CLIENT_EMAIL=your-firebase-client-email
FIREBASE_CLIENT_ID=your-firebase-client-id
FIREBASE_AUTH_URI=your-firebase-auth-uri
FIREBASE_TOKEN_URI=your-firebase-token-uri
FIREBASE_AUTH_PROVIDER_X509_CERT_URL=your-firebase-auth-provider-x509-cert-url
FIREBASE_CLIENT_X509_CERT_URL=your-firebase-client-x509-cert-url
FIREBASE_UNIVERSE_DOMAIN=your-firebase-universe-domain
```

📝 Note: All Firebase environment values can be obtained from your Firebase project settings under Project Settings → Service Accounts → Generate new private key.

#### For the frontend:

```env
VITE_MyTimeTable_BACKEND_UR=http://localhost:8000

⚠️ You can find all the below Firebase frontend keys in your Firebase project settings
VITE_FIREBASE_API_KEY=your-firebase-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
VITE_FIREBASE_PROJECT_ID=your-firebase-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
VITE_FIREBASE_APP_ID=your-firebase-app-id
VITE_FIREBASE_VAPID=your-firebase-vapid-key
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
- Get notified on time via browser push notifications.
- Edit or delete tasks as needed.
- The timetable is automatically saved and displayed when you log in.





## Contributing

Contributions are welcome! Feel free to fork the repository, make improvements, and submit a pull request.



## License

This project is licensed under the [MIT License](LICENSE).


*⏰ MyTimeTable - Organize Your Day, Achieve Your Goals.*
