import { Component, OnInit } from '@angular/core';
import { ExpenseService, Expense } from 'src/app/services/expense.service';
import { CurrencyService } from 'src/app/services/currency.service';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { GastoDetalleModalComponent } from 'src/app/components/gasto-detalle-modal/gasto-detalle-modal.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage implements OnInit {
  expenses$ = this.expenseService.expenses$;

  selectedCurrency = 'CLP';
  rates: any = { CLP: 1, USD: 1 };

  constructor(
    private expenseService: ExpenseService,
    private currencyService: CurrencyService,
    private alertController: AlertController,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.currencyService.getRates('USD').subscribe(res => {
      this.rates = res.rates;
    });
  }

  convert(amount: number, from: string, to: string): number {
    if (!this.rates) return amount;
    if (from === to) return amount;
    if (!this.rates[from] || !this.rates[to]) return amount;
    return amount * (this.rates[to] / this.rates[from]);
  }

  async confirmDelete(expense: Expense) {
  const alert = await this.alertController.create({
    header: '¿Eliminar gasto?',
    message: `¿Estás seguro de borrar el gasto de $${expense.amount} (${expense.categoria})?`,
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel'
      },
      {
        text: 'Eliminar',
        role: 'destructive',
        handler: () => {
          this.deleteExpense(expense);
        }
      }
    ]
  });

  await alert.present();
}

deleteExpense(expense: Expense) {
  this.expenseService.deleteExpense(expense);
}

async verDetalle(expense: Expense) {
  const modal = await this.modalCtrl.create({
    component: GastoDetalleModalComponent,
    componentProps: { expense }
  });
  await modal.present();
}

}
