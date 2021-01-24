export class Invoice {
  constructor(
    public Id: string,
    public Amount: number,
    public InvoiceNumber: string,
    public CustomerEmail: string,
    public IsMailSent: boolean,
    public invoiceDate: Date,
    public PaymentStatus: string,
  ){
  }
}
