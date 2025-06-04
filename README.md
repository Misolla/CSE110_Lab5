# Overview
In this lab, we set up a CI/CD pipeline using GitHub Actions and built a backend API using Express.js to persist and serve budget tracker data. This lab reinforces key software engineering practices like automated testing, RESTful API development, and client-server architecture.

# Key Components:
CI/CD with GitHub Actions:
- Set up automated unit testing on push/pull requests.
- Configured a GitHub Actions workflow triggered by changes to a specific branch.
- Added branch protection rules requiring passing tests before merging to main.

Frontend Integration:
- React hooks to load expenses/budget from the backend.
- Utility functions in client/src/utils/ for API calls.
- UI updates in real-time based on server responses.



Backend API with Express:
- Created a RESTful API using Express to handle:
    GET: Retrieve expenses and budget.
    POST: Add new expenses.
    DELETE: Remove expenses.
    PUT: Update the budget amount.
- Backend data is stored in database.
    Updated all expense routes to interact with SQLite: createExpenseServer, getExpenses, getExpenses
    Handled data validation and type safety with try/catch and type casting.

Project Structure:
project-root/  
├── .github/            # GitHub Actions workflow files  
├── client/             # React frontend  
├── server/             # Express backend with SQLite DB  
│   ├── database.sqlite # Persistent database file  
│   ├── createTable.ts  # SQLite setup logic  
│   └── src/  


Client-Server Integration:
- Used fetch API to interact with backend endpoints.
- Created utility functions in the client to perform:
    Fetching, creating, and deleting expenses.
    Fetching and updating the budget.
- Updated React components to load data from the backend on mount and reflect changes in real time.


