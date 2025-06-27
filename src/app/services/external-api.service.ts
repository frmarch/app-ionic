import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExternalApiService {
  constructor(private http: HttpClient) {}
  // Tipo de cambio dólar a peso chileno
  getUsdToClpRate(): Observable<number> {
    return this.http.get<any>('https://api.exchangerate-api.com/v4/latest/USD').pipe(
      map(resp => resp.rates.CLP)
    );
  }
}
