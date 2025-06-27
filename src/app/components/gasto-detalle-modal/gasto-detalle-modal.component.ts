import { Component, Input, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { Expense } from 'src/app/services/expense.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-gasto-detalle-modal',
  templateUrl: './gasto-detalle-modal.component.html',
  styleUrls: ['./gasto-detalle-modal.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class GastoDetalleModalComponent implements AfterViewInit {
  @Input() expense!: Expense;

  constructor(private modalCtrl: ModalController) {}

  ngAfterViewInit() {
    const lat = (this.expense as any).lat || -33.45;
    const lng = (this.expense as any).lng || -70.6667;

    const map = L.map('map').setView([lat, lng], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    L.marker([lat, lng]).addTo(map)
      .bindPopup('Gasto')
      .openPopup();

    setTimeout(() => {
    map.invalidateSize();
  }, 400);
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
