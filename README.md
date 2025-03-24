# Co-working Space Marketplace

A simplified web application that allows users to browse, filter, and book co-working spaces, with an admin panel to manage listings and bookings.

## Features
- **User Features:**
  - View a list of available co-working spaces.
  - Filter spaces by location, price, and amenities.
  - Book a workspace and view booking history.
- **Admin Features:**
  - Add, update, and delete co-working space listings.
  - Manage bookings (view all bookings as an admin).
- **Technical Highlights:**
  - RESTful API with JWT-based authentication.
  - Responsive UI inspired by [coworker.com](https://www.coworker.com) using blue, white, and black colors.

## Tech Stack
- **Frontend:** React vite 
- **Backend:** Node.js with Express.js
- **Database:** MongoDB
- **Authentication:** JSON Web Tokens (JWT)
- **Styling:** Tailwind CSS (with a focus on modern, clean design principles)

## Project Structure
```
coworking-app/
├── backend/
│   ├── models/          # MongoDB schemas (User, Space, Booking)
│   ├── routes/          # API route definitions
│   ├── middleware/      # Authentication middleware
│   ├── config/          # Database connection
│   └── server.js        # Entry point for backend
├── coworking-marketplace/
│   ├── src/
|   |   ├── utils/       #utility functions (api calls ) 
│   │   ├── components/  # Reusable UI components (SpaceCard, FilterBar, etc.)
│   │   ├── pages/       # Main pages (Home, Booking, AdminDashboard)
│   │   ├── App.js       # App routing and layout
│   │   └── index.html     # Frontend entry point
├── .env                 # Environment variables
└── README.md            # Project documentation
```

## Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm (v8 or higher)

## Installation
1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd coworking-marketplace 
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../coworking-marketplace 
   npm install
   ```

4. **Set Up Environment Variables**
   Create a `.env` file in the `backend/` directory with the following:
   ```
   MONGO_URI=mongodb://localhost:27017/coworking-app
   JWT_SECRET=your-secret-key-here
   PORT=5000
   ```

5. **Start the Backend**
   ```bash
   cd backend
   node server.js
   ```
   The backend will run on `http://localhost:5000`.

6. **Start the Frontend**
   ```bash
   cd coworking-marketplace 
   npm run dev 
   ```
   The frontend will run on `http://localhost:5173`.

## Usage
- **User Flow:**
  1. Sign up or log in at `/auth/signup` or `/auth/login`.
  2. Browse spaces on the homepage (`/`), apply filters as needed.
  3. Book a space via the booking page (`/bookings`).
  4. View your booking history at `/bookings`.

- **Admin Flow:**
  1. Log in with an admin account (set `role: "admin"` manually in the database for now).
  2. Access the admin dashboard (`/admin`) to manage spaces and bookings.

## API Endpoints
- **Auth:**
  - `POST /auth/signup` - Register a new user.
  - `POST /auth/login` - Log in and receive a JWT.
- **Spaces:**
  - `GET /spaces` - List spaces (supports filters: `?location=`, `?priceMax=`, `?amenities=`).
  - `POST /spaces` - Add a new space (admin only).
  - `PUT /spaces/:id` - Update a space (admin only).
  - `DELETE /spaces/:id` - Delete a space (admin only).
- **Bookings:**
  - `POST /bookings` - Create a booking.
  - `GET /bookings` - View user’s booking history.



