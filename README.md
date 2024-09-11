## Skin Shop Project

This project is a list of skins, you can edit, add or delete your skins.

It was made using the following technologies:
- NestJS
- PrismaOrm
- MongoDB
- Next.js
- Chakra UI
- TypeScript
- Jest

### How to configure the project

#### Backend:
1. Configure your .env file, there is already an example in the project where it contains the mongoDb url, you will only need to change the username and password.
2. Build docker:
    ```bash
    docker-compose build
    ```
3. Run docker:
    ```bash
    docker-compose up
    ```

#### Frontend:
1. Install dependencies:
    ```bash
    npm install
    ```
2. Change the API URL in the .env file to the one you configured in the backend.
3. Run the tests (optional):
    ```bash
    npm run test
    ```
4. Run the development server:
    ```bash
    npm run dev
    ```