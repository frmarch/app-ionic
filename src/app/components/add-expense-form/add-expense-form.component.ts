import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-expense-form',
  templateUrl: './add-expense-form.component.html',
  styleUrls: ['./add-expense-form.component.scss'],
  standalone: false
})
export class AddExpenseFormComponent {
  expenseForm: FormGroup;

  @Output() save = new EventEmitter<any>();

  categorias = ['Comida', 'Hogar', 'Transporte', 'Salud', 'Entretención', 'Otro'];
  personas = ['Tú', 'Pareja'];

  constructor(private fb: FormBuilder) {
    this.expenseForm = this.fb.group({
      currency: ['', Validators.required],
      monto: ['', [Validators.required, Validators.min(1)]],
      categoria: ['', Validators.required],
      descripcion: [''],
      quien: ['', Validators.required],
      fecha: [new Date(), Validators.required]
    });
  }

submit() {
  if (this.expenseForm.invalid) {
    this.expenseForm.markAllAsTouched();
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const expenseData = {
        ...this.expenseForm.value,
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      this.save.emit(expenseData);
    },
    (error) => {
      const expenseData = {
        ...this.expenseForm.value,
        lat: undefined,
        lng: undefined
      };
      this.save.emit(expenseData);
    }
  );
}

  get currency() { return this.expenseForm.get('currency'); }
  get monto() { return this.expenseForm.get('monto'); }
  get categoria() { return this.expenseForm.get('categoria'); }
  get quien() { return this.expenseForm.get('quien'); }
  get fecha() { return this.expenseForm.get('fecha'); }
}
