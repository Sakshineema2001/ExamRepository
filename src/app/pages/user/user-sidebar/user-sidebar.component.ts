import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css']
})
export class UserSidebarComponent implements OnInit{
      
  categories:any;
  constructor(private _cat:CategoryService, private snack:MatSnackBar,private login:LoginService) {
  }
  ngOnInit(): void {
    this._cat.getCategories().subscribe(
      (data:any)=>{
         this.categories=data;
         console.log(this.categories)
      },
      (error) =>{
        this.snack.open('Error in loading....','',{duration :3000})
      }
    )
  }

  public logOut(){
    this.login.logout();
    window.location.reload();
 }

}
