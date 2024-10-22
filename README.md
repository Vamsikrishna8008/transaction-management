Installation

1.Clone the repository:
git clone https://github.com/yourusername/transaction-category-management.git
cd transaction-category-management

2.Install the dependencies:
npm install

Environment Variables
Create a .env file in the root of the project and add the following environment variables:
PORT=5000
MONGO_URI=mongodb://localhost:27017/transactions_db

Running the Application
Start the server in development mode:
npm run dev

API Documentation

Transactions --------------------------------------------------

1. Add a Transaction (POST /api/transactions)
   URL: /api/transactions
   Method: POST
   Description: Adds a new transaction (income or expense).

Request Body Example:
{
"type": "income",
"category": "652b9c89df8312d4e88e7a0a", // replace with real category ID
"amount": 1500,
"description": "Salary for October",
"date": "2024-10-22T12:00:00.000Z"
}

Response Example:

{
"\_id": "652c4a2e01245bfb7c239b7d",
"type": "income",
"category": "652b9c89df8312d4e88e7a0a",
"amount": 1500,
"description": "Salary for October",
"date": "2024-10-22T12:00:00.000Z",
"\_\_v": 0
}

2. Get All Transactions (GET transactions)
   URL: /api/transactions
   Method: GET
   Description: Retrieves all transactions.
   Response Example:

[
{
"_id": "652c4a2e01245bfb7c239b7d",
"type": "income",
"category": {
"_id": "652b9c89df8312d4e88e7a0a",
"name": "Salary",
"type": "income"
},
"amount": 1500,
"description": "Salary for October",
"date": "2024-10-22T12:00:00.000Z",
"__v": 0
}
]

3. Get Transaction by ID (GET /transactions)
   URL: /api/transactions/:id
   Method: GET
   Description: Retrieves a specific transaction by its ID.

4. Update Transaction by ID (PUT /transactions/)
   URL: /api/transactions/:id
   Method: PUT
   Description: Updates an existing transaction by its ID.

5. Delete Transaction by ID (DELETE /transactions/)
   URL: /api/transactions/:id
   Method: DELETE
   Description: Deletes a specific transaction by its ID.

Categoty ------------------------------

1. Add a Category (POST /categories)
   URL: /api/categories
   Method: POST
   Description: Adds a new category (for either income or expense transactions).
   Request Body Example:

json
Copy code
{
"name": "Salary",
"type": "income"
}

Response Example:

json
{
"\_id": "652b9c89df8312d4e88e7a0a",
"name": "Salary",
"type": "income",
"\_\_v": 0
}

2. Get All Categories (GET /categories)
   URL: /api/categories
   Method: GET
   Description: Retrieves all categories.
   Response Example:

json

[
{
"_id": "652b9c89df8312d4e88e7a0a",
"name": "Salary",
"type": "income",
"__v": 0
},
{
"_id": "652b9d17df8312d4e88e7a0d",
"name": "Groceries",
"type": "expense",
"__v": 0
}
]

3. Get Category by ID (GET /categories/
   )
   URL: /api/categories/:id
   Method: GET
   Description: Retrieves a specific category by its ID.

4. Update Category by ID (PUT /categories/)
   URL: /api/categories/:id
   Method: PUT
   Description: Updates a specific category by its ID.

5. Delete Category by ID (DELETE /categories/)
   URL: /categories/:id
   Method: DELETE
   Description: Deletes a specific category by its ID.

Summary Endpoint -----------------------------------------------

Get Transaction Summary (GET /summary)
URL: /api/transactions/summary
Method: GET
Description: Retrieves a summary of transactions (total income, total expenses, balance). Can optionally filter by date range or category.
Query Parameters:

startDate: Optional, filters transactions from a specific date (YYYY-MM-DD format).
endDate: Optional, filters transactions until a specific date (YYYY-MM-DD format).
category: Optional, filters transactions by a specific category ID.
Response Example:

json

{
"totalIncome": 5000,
"totalExpenses": 3000,
"balance": 2000
}

Testing
You can use Postman or any other API testing tool to test the endpoints. Here are some example requests:

Add a transaction using POST /transactions.
Retrieve all transactions using GET /transactions.
Get a summary using GET /transactions/summary.

Report End point -----------------

Get Transaction Summary (GET /report)
URL: /api/transactions/report
params : year,month
Method: GET
