import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from 'src/app/component/navbar/navbar.component';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
  
  constructor(private login:LoginService){

  }
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  public logOut(){
    this.login.logout();
    window.location.reload();
 }


}
