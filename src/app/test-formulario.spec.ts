import { TestBed } from '@angular/core/testing';
import { ExpenseService, Expense } from './services/expense.service';
import { IonicStorageModule } from '@ionic/storage-angular';

describe('ExpenseService', () => {
  let service: ExpenseService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonicStorageModule.forRoot()],
      providers: [ExpenseService]
    }).compileComponents();
    service = TestBed.inject(ExpenseService);
    await service.clearExpenses();
  });

  it('creación del servicio', () => {
    expect(service).toBeTruthy();
  });

  it('agregar un gasto', async () => {
    const expense: Expense = {
      description: 'Comida',
      amount: 5000,
      date: new Date(),
      categoria: 'Comida',
      quien: 'Tú',
      currency: 'CLP',
      lat: -33.45,
      lng: -70.6667
    };
    await service.addExpense(expense);
    const gastos = await service.getExpenses();
    expect(gastos.length).toBe(1);
    expect(gastos[0].description).toBe('Comida');
  });

  it('limpiar todos los gastos', async () => {
    const expense: Expense = {
      description: 'Test',
      amount: 1,
      date: new Date(),
      categoria: 'Otro',
      quien: 'Pareja',
      currency: 'USD',
      lat: -33,
      lng: -70
    };
    await service.addExpense(expense);
    await service.clearExpenses();
    const gastos = await service.getExpenses();
    expect(gastos.length).toBe(0);
  });
});
