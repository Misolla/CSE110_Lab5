import { Expense } from "../types";
import { Request, Response } from "express";

export function createExpenseServer(req: Request, res: Response, expenses: Expense[]) {
    const { id, cost, name } = req.body;

    if (!name || !id || !cost) {
        return res.status(400).send({ error: "Missing required fields or zero cost" });
    }

    const newExpense: Expense = {
        id: id,
        name,
        cost,
    };

    expenses.push(newExpense);
    res.status(201).send(newExpense);
}

export function deleteExpense(req: Request, res: Response, expenses: Expense[]) {
    // TO DO: Implement deleteExpense function
    const expenseID: string = req.params.id;
    const expenseIndex: number = expenses.findIndex(expense => expense.id == expenseID);
    if (expenseIndex >= 0) {
        expenses.splice(expenseIndex, 1);
        res.status(201).send();
    } else {
        res.status(404).send();
    }

    
}

export function getExpenses(req: Request, res: Response, expenses: Expense[]) {
    res.status(200).send({ "data": expenses });
}