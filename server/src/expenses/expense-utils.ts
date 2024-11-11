import { Expense } from "../types";
import { Request, Response } from "express";
import { Database } from "sqlite"

export async function createExpenseServer(req: Request, res: Response, db: Database) {

    try {
        // Type casting the request body to the expected format.
        const { id, cost, name } = req.body as { id: string, cost: number, name: string };
 
        if (!name || !id || !cost) {
            return res.status(400).send({ error: "Missing required fields" });
        }
 
        await db.run('INSERT INTO expenses (id, name, cost) VALUES (?, ?, ?);', [id, name, cost]);
        res.status(201).send({ id, name, cost });
 
    } catch (error) {
 
        return res.status(400).send({ error: `Expense could not be created, + ${error}` });
    };
 
 }

export async function deleteExpense(req: Request, res: Response, db: Database) {
    try {
        const expenseID: string = req.params.id;
        const expense = await db.get('SELECT * FROM expenses WHERE id = ?;', [expenseID]);
        
        if (!expense) {
            return res.status(400).send({ error: "Expense not found" });
        }

        await db.run('DELETE FROM expenses WHERE id = ?;', [expenseID]); 
        res.status(201).send();

    } catch (error) {
        return res.status(400).send({ error: `Expense could not be deleted, + ${error}` });
    }

    
}

export async function getExpenses(req: Request, res: Response,  db: Database) {
    try {
        const expenses: Expense[] = await db.all('SELECT * FROM expenses;');
        
        if (expenses.length === 0) {
            return res.status(400).send({ error: "No expenses found" });
        }
        
        res.status(200).send({ data: expenses });
    } catch (error) {
        return res.status(400).send({ error: `Could not retrieve expenses: ${error}` });
    }
}