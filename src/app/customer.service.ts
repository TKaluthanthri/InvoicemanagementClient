import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders ,HttpParams } from '@angular/common/http';
import { Customer } from './Models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  successMessage: string;
  errorMessage: string;

  private apiUrl = 'https://localhost:44349/api/customer';
  HttpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json' })
  }

  constructor(private httpClent: HttpClient) {

   }
  GetAllCustomers(): Observable<any[]> {
    const response = this.httpClent.get<any[]> (this.apiUrl + '/getAllCustomers');
    return response;
  }

  SaveCustomer(data: Customer) {
    this.httpClent.post<any>(this.apiUrl + '/savecustomer', data, this.HttpOptions).subscribe({
      next: data => {
        this.successMessage = data.message;
     },
     error: error => {
         this.errorMessage = error.message;
     }
    })};

    // DeleteCustomerbyId(id){
    //   this.httpClent.delete<any>(`${this.apiUrl}/removecustomer?Id=${id}`).subscribe({
    //     next: data => {
    //       //this.successMessage = data;
    //    },
    //    error: error => {
    //        this.errorMessage = error.message;
    //    }
    //   })}
}
