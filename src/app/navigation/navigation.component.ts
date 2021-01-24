import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  public isLoggedId: boolean;
  constructor() { }

  ngOnInit(): void {
    const loggedUserToken = localStorage.getItem('userToken');
    if (loggedUserToken === null || loggedUserToken === undefined) {
      this.isLoggedId = false;
    }
    else {
      this.isLoggedId = true;
    }
  }

  logout(): void {

  }
}
