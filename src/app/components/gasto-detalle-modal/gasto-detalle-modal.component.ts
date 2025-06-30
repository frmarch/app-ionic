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
    if (this.expense.lat !== undefined && this.expense.lng !== undefined) {
      const map = L.map('map').setView([this.expense.lat, this.expense.lng], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      L.marker([this.expense.lat, this.expense.lng]).addTo(map)
        .bindPopup('Gasto')
        .openPopup();

      setTimeout(() => {
        map.invalidateSize();
      }, 400);
    }
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
