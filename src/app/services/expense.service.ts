import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage-angular';

export interface Expense {
  description: string;
  amount: number;
  date: Date;
  categoria: string;
  quien: string;
  currency: string;
}

@Injectable({ providedIn: 'root' })
export class ExpenseService {
  private _expenses = new BehaviorSubject<Expense[]>([]);
  expenses$ = this._expenses.asObservable();
  private storageKey = 'expenses';

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create();
    const data = await this.storage.get(this.storageKey);
    if (data) {
      this._expenses.next(data);
    }
  }

  async addExpense(expense: Expense) {
    const current = this._expenses.value;
    const updated = [...current, expense];
    this._expenses.next(updated);
    await this.storage.set(this.storageKey, updated);
  }

  async getExpenses(): Promise<Expense[]> {
    const data = await this.storage.get(this.storageKey);
    return data || [];
  }

  async clearExpenses() {
    this._expenses.next([]);
    await this.storage.remove(this.storageKey);
  }

  async deleteExpense(expense: Expense) {
  const current = this._expenses.value;
  const updated = current.filter(
    e =>
      !(e.amount === expense.amount &&
        e.date === expense.date &&
        e.categoria === expense.categoria &&
        e.quien === expense.quien &&
        e.currency === expense.currency &&
        e.description === expense.description)
  );
  this._expenses.next(updated);
  await this.storage.set(this.storageKey, updated);
}

}
