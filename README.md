# Twitter-Express

Twitter-Express is a simple Twitter-like application built using Node.js, Express, and Pug. It also utilizes Passport.js for authentication, session management with `express-session`, and MongoDB for data storage, with session storage handled by `connect-mongo`.

## Features

- **User Authentication**: Managed using Passport.js.
- **Session Management**: Sessions are stored in MongoDB using `connect-mongo`.
- **Pug Templating**: The frontend is rendered using the Pug templating engine.
- **CRUD Operations**: Users can create, read, update, and delete tweets.
- **Seeding**: Initial data seeding to populate the database with fake data for testing.

## Installation

### Prerequisites

- **Node.js**: Ensure you have Node.js installed (version 14.x or higher).
- **MongoDB**: You need a running MongoDB instance or a MongoDB Atlas account.

### Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/twitter-express.git
   ```

2. **Install all necessary dependencies using npm**

```bash
npm install
```

2. **Set Up Environment Variables**

Copy the .env.example file to .env:

```bash
cp .env.example .env
```

Open the .env file and add your MongoDB URL and a secret key for session management

3. **Run Seeders**

Populate the database with some fake data by running:

```bash
npm run seed
```

4. **Start the Application**

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
