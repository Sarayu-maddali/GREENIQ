# GREEN IQ

GREEN IQ is a full-stack web application that combines real-time pollution tracking with a gamified eco-action system. Users can monitor air quality, perform eco-friendly tasks, earn points, unlock achievements, and compete on a leaderboard.

## Features

* User authentication with JWT
* Real-time pollution data using WAQI API
* Search pollution by city or current location
* Data visualization with charts
* Pollution history tracking
* Gamified task system with scoring and levels
* Leaderboard based on user scores
* User profile with stats and achievements

## Tech Stack

Frontend:

* HTML
* CSS
* JavaScript
* Chart.js

Backend:

* Node.js
* Express.js

Database:

* MySQL
* Sequelize ORM

Authentication:

* JSON Web Tokens (JWT)

## Setup

1. Clone the repository:
   git clone https://github.com/your-username/green-iq.git
   cd green-iq

2. Install dependencies:
   npm install

3. Create a MySQL database:
   CREATE DATABASE greeniq;

4. Update database credentials in server.js or use environment variables.

5. Run the server:
   node server.js

6. Open login.html in your browser.

## API Endpoints

Auth:

* POST /api/auth/signup
* POST /api/auth/login
* GET /api/auth/me

User:

* GET /api/user/stats
* GET /api/user/achievements

Game:

* POST /api/score
* GET /api/gametasks

Pollution:

* POST /api/pollution/history
* GET /api/pollution/history

Leaderboard:

* GET /api/leaderboard

## Notes

* Configure environment variables for database credentials and JWT secret before deployment.
* Ensure the backend server is running on http://localhost:4000.

## License

This project is for educational purposes.
