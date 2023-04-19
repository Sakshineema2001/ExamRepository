import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  //need to work on it
  isLoggedIn = false;
  user:any = null;

  constructor(public login:LoginService){
 
  }
  ngOnInit(): void {
    this.isLoggedIn = this.login.isLoggedin();
    this.user = this.login.getUser();
    this.login.loginStatus.asObservable().subscribe((data) => {
      this.isLoggedIn = this.login.isLoggedin();
      this.user = this.login.getUser();
    });
  }


  public logOut(){
     this.login.logout();
     this.login.loginStatus.asObservable().subscribe((data) =>{
      this.isLoggedIn = this.login.isLoggedin();
      this.user = this.login.getUser();
     }
     )
     window.location.reload();
  }
}
