import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders , HttpParams } from '@angular/common/http';
import { Invoice } from './Models/Invoice';

@Injectable ({
  providedIn: 'root'
})
export class InvoiceService {
  successMessage: string;
  errorMessage: string;

  private apiUrl = 'https://localhost:44349/api/invoice';
  HttpOptions = {
      headers : new HttpHeaders({'Content-Type': 'application/json' })
  };
  constructor(private httpClient: HttpClient) { }

  GetAllInvoices(): Observable<any[]> {
    const response = this.httpClient.get<any[]> (this.apiUrl + '/getAllInvoices');
    return response;
  }

  GetCustomerEmailList(): Observable<any[]> {
    const response = this.httpClient.get<any[]> (this.apiUrl + '/getAllCustomerEmails');
    return response;
  }

  SaveInvoice(data: Invoice) {
    this.httpClient.post<any>(this.apiUrl + '/saveInvoiceDetails', data, this.HttpOptions).subscribe({
      next: response => {
        this.successMessage = response.message;
     },
     error: error => {
         this.errorMessage = error.message;
     }
    });
  }

    GetAllInvoicesByEmail(Email:string ): Observable<any[]> {
      const data = {Email: Email};
      const response = this.httpClient.get<any>(this.apiUrl + '/getInvoicesByEmail', {params: data});
      return response;
    }

    DeleteInvoice(InvoiceNumber: string){
      this.httpClient.delete<any>(`${this.apiUrl}/deleteInvoice?InvoiceNumber=${InvoiceNumber}`).subscribe({
        next: data => {
          this.successMessage = data;
       },
       error: error => {
           this.errorMessage = error.message;
       }
      })}

}
