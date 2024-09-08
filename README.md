# Twitter-Express

Twitter-Express is a simple Twitter-like application built using Node.js, Express, and Pug. It also utilizes Passport.js for authentication, session management with `express-session`, and MongoDB for data storage, with session storage handled by `connect-mongo`.

## Features

- **User Authentication**: Managed using Passport.js.
- **Session Management**: Sessions are stored in MongoDB using `connect-mongo`.
- **Pug Templating**: The frontend is rendered using the Pug templating engine.
- **Tweet Management**: Users can create, read, update, and delete tweets.
- **Seeding**: Initial data seeding to populate the database with fake data for testing.
- **Email functionality**: Nodemailer is integrated to allow password resets and account verification.

## Installation

### Prerequisites

Before you begin, ensure you have the following:

- **Node.js**: Version 14.x or higher.
- **MongoDB**: A running MongoDB instance or a MongoDB Atlas account.
- **Mailtrap**: Required for email testing.

### Steps

1. **Clone the Repository**

Clone the project to your local machine:

```bash
git clone https://github.com/yourusername/twitter-express.git
```

2. **Install Dependencies**

Navigate to the project directory and install the necessary npm packages:

```bash
npm install
```

3. **Set Up Environment Variables**

Copy the .env.example file to .env:

```bash
cp .env.example .env
```

Open the `.env` file and add your MongoDB URL, session secret key and Mailtrap credentials.

4. **Run Seeders**

Populate the database with some fake data by running:

```bash
npm run seed
```

5. **Start the Application**

```bash
npm start
```

The application will run on http://localhost:3001.

## Technologies Used

- **Express:** Web framework for Node.js.
- **Pug:** Templating engine for generating HTML.
- **Passport.js:** Authentication middleware for Node.js.
- **express-session:** Middleware for managing sessions.
- **connect-mongo:** MongoDB session store for Express.
- **MongoDB:** NoSQL database for storing tweets and user data.
- **Nodemailer**: Email sending service for features like password resets and account verification.
