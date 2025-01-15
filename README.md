# Graphite LMS (Learning Management System)

Welcome to **Graphite LMS**, a full-stack Learning Management System designed to offer a seamless experience for educators and learners. This application provides robust course management, secure user authentication, real-time communication, and a fully integrated payment system.

---

## Features

### User Features
- **User Authentication**:
  - Secure login and registration using Google OAuth2.
  - JWT-based session management for secure and seamless access.
- **Course Management**:
  - Browse, view, and enroll in available courses.
  - Rich text editor for creating and managing course content.
- **Cart & Payment**:
  - Add courses to the cart and securely check out using PayPal integration.
- **Real-Time Chat**:
  - Interactive discussions with peers and educators powered by Socket.io.
- **Progress Tracking**:
  - View enrolled courses and track learning progress.

### Admin Features
- **Dashboard**:
  - Manage users, courses, and notifications efficiently.
- **Course Management**:
  - Add, edit, or delete courses.
- **User Management**:
  - Monitor and manage user activity.

---

## Technologies Used

### Frontend
- **Core Frameworks**: React.js, Redux Toolkit
- **Styling**: Tailwind CSS, Radix UI
- **Validation**: React Hook Form, Zod
- **Media & Charts**: React Player, Recharts
- **State Management**: Redux Persist
- **Real-Time Communication**: Socket.io-client
- **Payment Integration**: PayPal React SDK

### Backend
- **Framework**: Node.js with Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: Google OAuth2, JWT
- **File Storage**: Cloudinary
- **Scheduling**: Node-cron
- **Security**: Bcrypt for password hashing
- **Email Services**: Nodemailer

### Development Tools
- **Languages**: TypeScript
- **Linters & Formatters**: ESLint, Prettier
- **Runtime Tools**: Nodemon, ts-node-dev
- **Database ORM**: Prisma

---

## Setup & Installation

1. **Clone the repository:**
   
   ```bash
   git clone https://github.com/adarshstillalive/Graphite-LMS.git
   cd Graphite-LMS

2. **Install Dependencies:**
   - **For the backend**

     ```bash
     cd server
     npm install
     
   - **For the frontend**

     ```bash
     cd client
     npm install

3. **Set up Environment Variables:**
  - Create a .env file in the server directory with the following variables:
    
    ```bash
    PORT=<server_port>
    SERVER_URL=<server_url>
    CLIENT_URL=<client_url>
    POSTGRESQL_DATABASE_URL=<postgres_connection_string>
    MONGO_DATABASE_URL=<mongo_connection_string>
    MONGO_USERNAME=<mongo_username>
    MONGO_PASSWORD=<mongo_password>
    NODEMAILER_USER=<nodemailer_user_mail>
    NODEMAILER_APP_PASSWORD=<mail_app_password>
    OAUTH_CLIENT_ID=<oauth_client_id>
    OAUTH_CLIENT_SECRET=<oauth_client_secret>
    JWT_SECRET=<your_jwt_secret>
    JWT_REFRESH_SECRET=<your_jwt_refresh_secret>
    JWT_EXPIRY=<your_jwt_expiry>
    JWT_REFRESH_EXPIRY=<your_jwt_expiry>
    CLOUDINARY_CLOUD_NAME=<cloudinary_name>
    CLOUDINARY_API_KEY=<cloudinary_api_key>
    CLOUDINARY_API_SECRET=<cloudinary_api_secret>
    PAYPAL_CLIENT_ID=<paypal_client_id>
    PAYPAL_CLIENT_SECRET=<paypal_client_secret>

4. **Run the application:**
   - **Start the backend server**

     ```bash
     cd server
     npm start
     
   - **Start the frontend development server**

     ```bash
     cd client
     npm run dev

5. **Access the Application**

   - Open your browser and visit: http://localhost:<frontend_port>

## Contact

For any queries or suggestions, feel free to reach out:
- Author: Adarsh K S
- Email: adarshstillalive@gmail.com
