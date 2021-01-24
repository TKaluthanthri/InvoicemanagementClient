import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../invoice.service';
import { Invoice } from '../Models/Invoice';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  invoices : any[];
  invoiceDate: string;
  isChecked: boolean;
  isConfirmedEmail: boolean;
  selectedCustomerEmail: string;
  customerList: string[];

  invoice = new Invoice('', 0, '', '', true, new Date('Fri Dec 08 2020 07:44:57'), '');
  isAddInvoice: boolean = false;

  GetInvoicesforCustomer($value, typeChange) {}

  constructor(private _invoiceService : InvoiceService,  protected datePipe: DatePipe) { }

  LoadAllCustomerEmails() {
    this._invoiceService.GetCustomerEmailList().subscribe((response : any[])=> {
      this.customerList = response;
    });
  }

  ngOnInit(): void {
    const  loggedUserToken = localStorage.getItem('userToken');
    this.loadAllInvoices();
    this.LoadAllCustomerEmails();
  }

  AddInvoice(): void {
    this.isAddInvoice = true;
  }

  SaveInvoice(invoice: Invoice) {
    invoice.IsMailSent = this.isConfirmedEmail;
    invoice.CustomerEmail =this.selectedCustomerEmail;
    invoice.CustomerEmail = this.selectedCustomerEmail;
    let response = this._invoiceService.SaveInvoice(this.invoice);
    this.invoices = [];

    setTimeout(()=>{
      this.loadAllInvoices();
    }, 3000);
  }

  checkValue(event: any){
    this.isChecked = event.srcElement.checked;
    if (this.isChecked) {
      this.isConfirmedEmail = this.clickMethod();
    }
    else {
      this.isConfirmedEmail = false;
    }
  }

  clickMethod(): boolean {
    if (confirm('Are you sure you want to send this Invoice as a Email')) {
     return true;
    }
    else {
      return false;
    }
  }

  invoiceCancel() {
    this.isAddInvoice = false;
    this.invoice = new Invoice('', 0, '', '', true, new Date('Fri Dec 08 2020 07:44:57'), '');
  }

  loadAllInvoices() {
    this._invoiceService.GetAllInvoices().subscribe((response : any[])=> {
      this.invoices = response;
    });
  }

  SelectCustomer(selectedCustomer: any) {
    this.selectedCustomerEmail =  selectedCustomer;
  }

  getinvoice(invoice: Invoice) {
    if (!this.isAddInvoice) {
      this.isAddInvoice = true;
    }
    this.selectedCustomerEmail = invoice.CustomerEmail;
    this.invoice = invoice;
  }

  DateTimeConverting(date_: Date) {
    date_= new Date();
    return this.datePipe.transform(date_, 'yyyy-MM-dd');
   }

   SearchInvoicesByCustomer() {
    if (this.selectedCustomerEmail !== 'undefined') {
      this._invoiceService.GetAllInvoicesByEmail(this.selectedCustomerEmail).subscribe((response : any[])=> {
        this.invoices = response;
      });
    }
   }

   removeInvoice(invoice: Invoice) {
    let response = this._invoiceService.DeleteInvoice(invoice.InvoiceNumber);
    alert('Invoice removed Successfully');
    this.loadAllInvoices();
   }

}
