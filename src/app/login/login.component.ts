import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators , ReactiveFormsModule } from '@angular/forms';
import {Router} from '@angular/router';

@Component ({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  public loggedUser: string;
  public isLoggedId: boolean;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.form = this.formBuilder.group({
      email:['', Validators.required],
      password:['', Validators.required]
    });
  }

  ngOnInit(): void {

  }
  userLogin(){
    const inputValue = this.form.value;
    if(inputValue.email === 'user' && inputValue.password === 'user')
    {
      this.router.navigate(['/invoices'])
      this.loggedUser = inputValue.email ;
      localStorage.setItem("userToken", this.loggedUser);
      let data = JSON.parse(localStorage.getItem("userToken"));
      console.log(data);
      this.isLoggedId = false;
    }
    //console.log(inputValue.email, inputValue.password);
    // this.authService.login(inputValue.email, inputValue.password)
    // .subscribe(
    //   success => this.router.navigate(['/invoices']),
    //   error => alert(error)
    // );
  }
}
