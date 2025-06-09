import { Injectable } from '@angular/core';

export interface Expense {
  description: string;
  amount: number;
  date: Date;
  categoria: string;
  quien: string;
}


@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private expenses: Expense[] = [];

  getExpenses() {
    return this.expenses;
  }

  addExpense(expense: Expense) {
    this.expenses.push(expense);
  }
}
