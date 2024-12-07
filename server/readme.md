
# Express Server

A simple server built with Node.js and Express.js to manage authentication routes.

---

## Features

- **Authentication Endpoints**:
  - `/api/auth/login`: Handles user login requests.
  - `/api/auth/register`: Handles user registration requests.
- Middleware integration for:
  - JSON request parsing.
  - Cookie parsing.
  - Cross-Origin Resource Sharing (CORS).

---

## Installation

1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd <repository_name>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure the server:
   - Edit the `config/config.ts` file to set up the server port and other configurations.

4. Build the server code:
   ```bash
   npm run build
   ```

5. Start the server:
   ```bash
   npm run start:server
   ```
   By default, the server will run on `http://localhost:3000` (or the port specified in `config.express.PORT`).

---

## Endpoints

### Authentication Routes

#### 1. **Login**
   **URL**: `/api/auth/login`  
   **Method**: `POST`  
   **Request Body**:
   ```json
   {
       "username": "your_username",
       "password": "your_password"
   }
   ```
   **Response**:
   ```json
   {
       "login": "bubu"
   }
   ```
   **Example Request**:
   ```bash
   curl -X POST http://localhost:3000/api/auth/login -H "Content-Type: application/json" -d '{"username": "testuser", "password": "testpass"}'
   ```

#### 2. **Register**
   **URL**: `/api/auth/register`  
   **Method**: `POST`  
   **Request Body**:
   ```json
   {
       "username": "your_username",
       "password": "your_password"
   }
   ```
   **Response**:
   ```json
   {
       "login": "bubu"
   }
   ```
   **Example Request**:
   ```bash
   curl -X POST http://localhost:3000/api/auth/register -H "Content-Type: application/json" -d '{"username": "testuser", "password": "testpass"}'
   ```

---

## File Structure

<!-- ```
src/
├── config/
│   └── config.ts         # Server configuration
├── lib/
│   └── AuthRoutes.ts     # Authentication route handlers
├── routes/
│   └── RoutesInstance.ts # Router initialization
├── factory.ts            # Factory pattern for singleton instances
├── server.ts             # Main server setup
└── index.ts              # Server entry point
``` -->

---

## Usage

1. Start the server using `npm run start:server`.
2. Use any API client (e.g., Postman, curl) to interact with the routes.

   Example `POST /api/auth/login`:
   ```bash
   curl -X POST http://localhost:3000/api/auth/login -H "Content-Type: application/json" -d '{"username": "testuser", "password": "testpass"}'
   ```
   Example `POST /api/auth/register`:
   ```bash
   curl -X POST http://localhost:3000/api/auth/register -H "Content-Type: application/json" -d '{"username": "testuser", "password": "testpass"}'
   ```

---

## License

This project is licensed under the [MIT License](LICENSE).

---

Feel free to extend or modify the server as needed!
