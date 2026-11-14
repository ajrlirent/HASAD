<h1>AJRLI ADMIN PANEL</h1>

# Project Setup

Follow these steps to set up the project:

1. **Create a `.env.local` file** in the root directory of your project.

2. **Generate a secret key** by running the following command:
   ```bash
   openssl rand -base64 32
   ```

3. **Copy the generated key** and add it to your `.env.local` file:
   ```bash
   SESSION_SECRET=your_secret_key
   ```

4. **Set the backend URL** in your `.env.local` file:
   ```bash
   NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
   ```

5. **Install dependencies** by running:
   ```bash
   npm install
   ```

6. **Start the development server** with:
   ```bash
   npm run dev
   ```