import { Component, OnInit } from '@angular/core';
import { ExpenseService, Expense } from 'src/app/services/expense.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage implements OnInit {
  expenses: Expense[] = [];

  constructor(private expenseService: ExpenseService) {}

  ngOnInit() {
    this.expenses = this.expenseService.getExpenses();
  }
}
