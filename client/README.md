# Conference Website

A modern conference website built with the MERN stack (MongoDB, Express.js, React, Node.js).

## Features

- Responsive design that works on all devices
- Dynamic page content management
- Admin dashboard for content management
- Call for Papers (CFP) submission system
- Conference schedule management
- Contact form with email notifications
- User authentication and authorization

## Frontend Structure

```
src/
├── components/         # Reusable UI components
│   ├── Navbar.js      # Navigation bar component
│   └── Footer.js      # Footer component
├── pages/             # Page components
│   ├── Home.js        # Home page
│   ├── CFP.js         # Call for Papers page
│   ├── Schedule.js    # Conference schedule
│   ├── Contact.js     # Contact page
│   └── DynamicPage.js # Dynamic page renderer
├── admin/             # Admin dashboard components
│   └── AdminDashboard.js
├── assets/            # Static assets (images, etc.)
├── utils/             # Utility functions
└── context/           # React context providers
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   cd client
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App

## Dependencies

- React
- React Router DOM
- Axios
- Styled Components
- React Icons

## Backend API Endpoints

The frontend expects the following API endpoints:

- `/api/pages/:slug` - Get page content
- `/api/submissions` - Submit paper
- `/api/schedule/:day` - Get schedule for specific day
- `/api/contact` - Submit contact form
- `/api/admin/*` - Admin dashboard endpoints

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License.
