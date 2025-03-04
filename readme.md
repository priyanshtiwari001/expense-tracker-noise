# Expense Tracker


https://github.com/user-attachments/assets/e0221811-c090-446a-97f1-366a848ad6a6



## Requirements

Users should be able to:

- Add expenses with details (amount, category, date, and description).
- View a list of recorded expenses.
- Filter expenses by date and category.
- View the total expenses for a given period.

## Tech Stack

- **Backend:** Node.js with Express (using MongoDB/MySQL for storage).
- **Frontend:** React.js.

## API Endpoints

### Expenses Management

- `POST /expenses` → Add a new expense.
- `GET /expenses` → Retrieve all expenses.
- `GET /expenses?category=Food&date=YYYY-MM-DD` → Filter expenses.
- `GET /expenses/total?start=YYYY-MM-DD&end=YYYY-MM-DD` → Get total expenses for a date range.

---

## Local Setup (Server)

1. Add your `.env` file in the server folder with:
   ```env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/expensesdb
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the server:
   ```sh
   npm run dev
   ```

---

## Running Locally (Client)

1. Navigate to the client folder:
   ```sh
   cd client
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the client application:
   ```sh
   npm run dev
   ```

Now, the application should be running locally! 🎉

