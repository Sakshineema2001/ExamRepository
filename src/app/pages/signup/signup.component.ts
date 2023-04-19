import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  constructor(private userservice:UserService,private snack:MatSnackBar){

  }
  public user ={
   username: '',
   password: '',
   firstName: '',
   lastName: '',
   email: '',
   phoneNo: ''

  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  formSubmit(){
    console.log(this.user);
    if(this.user.username=='' || this.user.username==null){
      this.snack.open('user is required','',{
        duration:3000
      })
      return;
    }
    this.userservice.addUser(this.user).subscribe(
      (data:any) =>{
        console.log(data);
        Swal.fire('success','user successfully registered with userName '+ data.username,'success')
        
      },
      (error:any) =>{
        this.snack.open('something went wrong','',{
          duration:3000
        })
      }
    )
  }
}
