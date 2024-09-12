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
1. First of all, you must add the url of your MongoDB inside docker-compose.yml, I will leave an example of how it should be. (the collection should be called skins)

2. Build docker:
    ```bash
    docker compose build
    ```

3. Run docker:
    ```bash
    docker compose up
    ```

4. Available routes:
    - GET /skin: Returns all skins
    - POST /skin: Creates a new skin
    - PUT /skin/:id: Updates a skin
    - DELETE /skin/:id: Deletes a skin

obs: If you have any problems with CORS, remember to change the origin route of your frontend in the main.ts file inside the backend

#### Frontend:
1. Install dependencies:
    ```bash
    npm install
    ```

2. Change the API URL in the .env file to the one you configured in the backend.

3. Run the development server:
    ```bash
    npm run dev
    ```

4. The following fields must be filled in to add a skin:
    - name (cannot be empty)
    - image (cannot be empty)
    - price (value cannot be 0)
    - float (value cannot be 0)
    - category (cannot be empty)
    
5. When adding a skin image to the frontend,
remember that the image needs to be the url of an image, not the file path, for example:
    ```bash
    https://cs.money/img/main/slider-items/cs/5.png
    ```

#### Tests:
I had some problems with the testing part and ended up not being able to implement it in time.