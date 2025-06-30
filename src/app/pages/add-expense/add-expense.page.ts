import { Component } from '@angular/core';
import { ExpenseService, Expense } from 'src/app/services/expense.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.page.html',
  styleUrls: ['./add-expense.page.scss'],
  standalone: false
})
export class AddExpensePage {
  constructor(
    private expenseService: ExpenseService,
    private router: Router,
    private toastController: ToastController
  ) {}

  async onSave(expenseData: any) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const expense: Expense = {
            description: expenseData.descripcion,
            amount: expenseData.monto,
            date: expenseData.fecha,
            categoria: expenseData.categoria,
            quien: expenseData.quien,
            currency: expenseData.currency,
            lat: lat,
            lng: lng
          };
          await this.expenseService.addExpense(expense);
          await this.presentToast('¡Gasto agregado con ubicación!');
          this.router.navigate(['/home']);
        },
        async (error) => {
          const expense: Expense = {
            description: expenseData.descripcion,
            amount: expenseData.monto,
            date: expenseData.fecha,
            categoria: expenseData.categoria,
            quien: expenseData.quien,
            currency: expenseData.currency,
            lat: undefined,
            lng: undefined
          };
          await this.expenseService.addExpense(expense);
          await this.presentToast('¡Gasto agregado (sin ubicación GPS)!');
          this.router.navigate(['/home']);
        }
      );
    } else {
      const expense: Expense = {
        description: expenseData.descripcion,
        amount: expenseData.monto,
        date: expenseData.fecha,
        categoria: expenseData.categoria,
        quien: expenseData.quien,
        currency: expenseData.currency,
        lat: undefined,
        lng: undefined
      };
      await this.expenseService.addExpense(expense);
      await this.presentToast('¡Gasto agregado (sin ubicación GPS)!');
      this.router.navigate(['/home']);
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color: 'success',
      position: 'bottom',
      cssClass: 'mi-toast-personalizado'
    });
    await toast.present();
  }
}
