import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import baseurl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatus = new Subject<boolean>();

  constructor(private http:HttpClient) { }

  //get current user
  public getCurrentUser(){
    return this.http.get(`${baseurl}/current-user`);
  }

  //generatte token
  public generateToken(loginData:any){
     return this.http.post(`${baseurl}/generate-token`,loginData)
  }

  //login user set token in local storage
  public loginUser(token:any){
    localStorage.setItem("token",token);
    return true;
  }

  //is login used is login or not

  public isLoggedin(){
    let tokenStr = localStorage.getItem("token");
    if(tokenStr == undefined || tokenStr == '' || tokenStr == null){
      return false;
    }else{
    return true;
  }
  }

  //logout : remove token from local storage

  public logout(){
    localStorage.removeItem('token');
    //as uper remove item is not working.... 
    localStorage.clear();
    return true;
  }

  //get token
  public getToken(){
    return localStorage.getItem('token');
  }

  public setUserDetails(user:any){

    localStorage.setItem('user',JSON.stringify(user));
  }

  //get user
  public getUser(){
    let userStr = localStorage.getItem("user");
    if(userStr!=null){
      return JSON.parse(userStr);
    }else{
      this.logout();
      return null;
    }
  }

  //get user role
  public getUserRole(){
    let user = this.getUser();
    return user.authorities[0].authority;
  }

}
