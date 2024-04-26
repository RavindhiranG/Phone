// phone-service.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Phone } from './phone'; // Import the Phone model

@Injectable({
  providedIn: 'root'
})
export class PhoneServiceService {

  private apiUrl = 'http://localhost:8080';

  constructor(private http : HttpClient) { }

  getPhones(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`);
  }

  createPhone(phone: Phone): Observable<Phone> {
    return this.http.post<Phone>(`${this.apiUrl}/add`, phone);
  }

  deletePhone(phoneId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${phoneId}`);
  }

  updatePhone(phoneId: number, updatedPhone: Phone): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update/${phoneId}`, updatedPhone);
  }

}
