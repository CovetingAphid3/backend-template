# TypeScript Backend Template

This is a TypeScript backend template for a website, using MongoDB as the database. It includes key features like user authentication, a ticket system, and inventory management. This project is designed to be a starting point for building robust backend systems for websites.

## Features
- **User Authentication**: Secure user login and registration with password hashing.
- **Ticket System**: A simple support ticketing system for tracking user issues.
- **Inventory Management**: Manage product inventory and stock levels.

## Technologies Used
- **Node.js**: JavaScript runtime for the backend.
- **TypeScript**: Adds static typing to JavaScript, ensuring better code quality.
- **MongoDB**: NoSQL database for data storage.
- **Express**: Web framework for building APIs.
- **Jest**: Testing framework for unit and integration tests.

## Folder Structure
```plaintext
├── src
│   ├── controllers       # Business logic for handling requests
│   ├── models            # MongoDB models (user, ticket, inventory,etc)
│   ├── routes            # API routes for the application
│   ├── middleware        # Authentication and other middleware
│   ├── utils             # Utility functions (e.g., logging)
│   ├── validation        # Data validation schemas
├── tests                 # Unit and integration tests
├── jest.config.js        # Jest configuration
├── tsconfig.json         # TypeScript configuration
├── package.json          # Project dependencies and scripts
└── .gitignore            # Git ignore rules
```

## Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [MongoDB](https://www.mongodb.com/) (v5+)

### Steps

1. Clone the repository:
   ```bash
   git clone git@github.com:CovetingAphid3/backend-template.git
   ```

2. Navigate to the project folder:
   ```bash
   cd backend-template
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file at the project root with the following contents:
   ```plaintext
   MONGO_URI=your-mongo-uri
   JWT_SECRET=your-secret-key
   ```

### Running the Application

- **Development (TypeScript)**: Run the project using TypeScript in development mode:
   ```bash
   npm run dev
   ```

- **Production (JavaScript)**: Convert TypeScript to JavaScript and run the compiled files:
   1. Compile TypeScript to JavaScript:
      ```bash
      npm run build
      ```
   2. Run the JavaScript file:
      ```bash
      node build/index.js
      ```

### Testing

Run the tests using Jest:
```bash
npm test
```

## License
This project is licensed under the MIT License.


