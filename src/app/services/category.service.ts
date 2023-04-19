import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseurl from './helper';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  //load All categories
  public getCategories(){
    return this.http.get(`${baseurl}/category/getAll`)
  }

  public addCategories(category:any){
    return this.http.post(`${baseurl}/category/`,category)
  }
}
