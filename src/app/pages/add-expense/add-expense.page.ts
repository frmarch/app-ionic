import { Component } from '@angular/core';
import { ExpenseService, Expense } from 'src/app/services/expense.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.page.html',
  styleUrls: ['./add-expense.page.scss'],
  standalone: false
})
export class AddExpensePage {
  constructor(
    private expenseService: ExpenseService,
    private router: Router
  ) {}

  onSave(expenseData: any) {
    const expense: Expense = {
      description: expenseData.descripcion,
      amount: expenseData.monto,
      date: expenseData.fecha,
      categoria: expenseData.categoria,
      quien: expenseData.quien
    };
    this.expenseService.addExpense(expense);
    this.router.navigate(['/home']);
  }
}
