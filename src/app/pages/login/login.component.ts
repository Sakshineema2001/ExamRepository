import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Route, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

 loginData ={
  username: '',
  password: '',
 };

  constructor(private snack:MatSnackBar, private loginservice:LoginService, private roter:Router){

  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  formSubmit(){
    if(this.loginData.username.trim() == '' || this.loginData.username == null){
       this.snack.open('user name is required', '',{
        duration:3000,
       });
       return;
    }
    if(this.loginData.password.trim() == '' || this.loginData.password == null){
      this.snack.open('password is required', '',{
       duration:3000,
      });
      return;
   }

  //request server to generate token

     this.loginservice.generateToken(this.loginData).subscribe(
      (data:any) =>{
        console.log('success');
        console.log(data);
        //login...
        this.loginservice.loginUser(data.token);
        this.loginservice.getCurrentUser().subscribe(
          (user:any) =>{
            this.loginservice.setUserDetails(user);
            console.log(user);

            //redirect if admin to admin dashboard
            //redirect if user to user
            if(this.loginservice.getUserRole() == "Admin"){
              //admin-dashboard
              //  window.location.href="/admin";
            this.roter.navigate(['admin'])
            this.loginservice.loginStatus.next(true);

            }else if(this.loginservice.getUserRole() == "Normal"){
              //user dashboard
              // window.location.href="/user-dashboard";
              this.roter.navigate(['user-dashboard/0'])
              this.loginservice.loginStatus.next(true);

            }else{
              this.loginservice.logout();
            }
          }
        )
      },(error:any) =>{
          console.log("Error !");
          console.log(error);
          this.snack.open('invalid Details  Try Again','',{
            duration:3000,
          })
      }
     )

  }

}
