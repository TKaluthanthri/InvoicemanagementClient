import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Customer } from '../Models/customer';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers: any[];
  customer = new Customer(0, '', '', '', '');
  isAddUser = false;

  constructor(private customerService : CustomerService) { }

  ngOnInit(): void {
    this.GetAllCustomers()
  }
  GetAllCustomers() {
    this.customerService.GetAllCustomers().subscribe((response : any[])=> {
      this.customers = response;
    });
  }

  getRecord(customer: Customer) {
    if (!this.isAddUser) {
      this.isAddUser = true;
    }
    this.customer = customer;
  }

  newCustomerCreate(): void {
    this.isAddUser = true;
  }

  SaveCustomer(customer: Customer) {
    const response = this.customerService.SaveCustomer(this.customer);
    this.GetAllCustomers();
  }

  userClickCancel() {
    this.isAddUser = false;
  }
}
