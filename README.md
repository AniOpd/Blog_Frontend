
# Bakend Repo Link
(https://github.com/AniOpd/Blog_Backend)

# Blog App

This is a full-stack Blog Application built with React, Redux, Tailwind CSS, and Node.js. The application allows users to register, login, create, edit, delete, and view blogs. Users can also reset their passwords.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- User Authentication (Register, Login, Logout)
- Password Reset via Email
- Create, Edit, Delete Blogs
- View All Blogs and Individual Blog Pages
- Like and Comment on Blogs
- User Profile Page
- Responsive Design

## Technologies Used

### Frontend

- React
- Redux Toolkit
- Tailwind CSS
- Axios
- React Router DOM
- Jodit React (WYSIWYG Editor)
- Cloudinary (Image Upload)

### Backend

- Node.js
- Express
- MongoDB (Mongoose)
- JWT (JSON Web Tokens)
- Bcrypt (Password Hashing)
- Nodemailer (Email Service)
- dotenv (Environment Variables)

## Installation

### Prerequisites

- Node.js
- MongoDB

### Clone the Repository

```bash
git clone https://github.com/AniOpd/Blog_Backend
git clone https://github.com/AniOpd/Blog_Frontend
```

### Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install the dependencies:

```bash
npm install
```

3. Create a `.env` file in the backend directory and add the following environment variables:

```env
DB_URI=your_mongodb_uri
SECRET=your_jwt_secret
EMAIL=your_email
PASSWORD=your_email_password
```

4. Start the backend server:

```bash
npm run dev
```

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd ../frontend
```

2. Install the dependencies:

```bash
npm install
```

3. Create a `.env` file in the frontend directory and add the following environment variable:

```env
VITE_BASE_URL=http://localhost:5000/
```

4. Start the frontend development server:

```bash
npm run dev
```

## Usage

1. Open your browser and navigate to `http://localhost:5173/`.
2. Register a new user or login with existing credentials.
3. Create, edit, delete, and view blogs.
4. Reset your password if needed.
5. Like and comment on blogs.

## API Endpoints

### User Routes

- `POST /user/register` - Register a new user
- `POST /user/login` - Login a user
- `POST /user/forgetpassword` - Send password reset email
- `POST /user/resetpassword` - Reset password
- `GET /user/logout` - Logout a user
- `POST /user/getuser` - Get user details

### Blog Routes

- `POST /blog/createblog` - Create a new blog
- `PUT /blog/updateblog` - Update an existing blog
- `POST /blog/deleteblog` - Delete a blog
- `PUT /blog/addcomment` - Add a comment to a blog
- `PUT /blog/removecomment` - Remove a comment from a blog
- `PUT /blog/likeblog` - Like a blog
- `PUT /blog/removelike` - Remove like from a blog

### Get Blog Routes

- `GET /blogs/getblogs` - Get all blogs
- `POST /blogs/getblog` - Get a single blog by ID

## Folder Structure

```plaintext
blog-app/
├── backend/
│   ├── controller/
│   ├── db/
│   ├── middlwares/
│   ├── model/
│   ├── routes/
│   ├── .env
│   ├── index.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── component/
│   │   ├── redux/
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   ├── main.jsx
│   │   └── vite.config.js
│   ├── .env
│   ├── index.html
│   ├── package.json
│   └── tailwind.config.js
└── README.md
```

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.
