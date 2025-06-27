import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CurrencyService {
  constructor(private http: HttpClient) {}

  getRates(base: string = 'USD'): Observable<any> {
    return this.http.get<any>(`https://open.er-api.com/v6/latest/${base}`);
  }

  convert(amount: number, from: string, to: string, rates: any): number {
    if (from === to) return amount;
    if (!rates[to] || !rates[from]) return amount;
    return amount * (rates[to] / rates[from]);
  }
}
