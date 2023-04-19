import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import baseurl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizzesService {

  constructor(private http:HttpClient) { }

  public getQuizzes():Observable<any>{
  return this.http.get(`${baseurl}/quiz/`)
  }

  public addQuizz(quiz:any){
    return this.http.post(`${baseurl}/quiz/`,quiz)
  }

  public updateQuiz(quiz:any){
    return this.http.put(`${baseurl}/quiz/`,quiz)
  }

  public deleteQuiz(qid:any){
    return this.http.delete(`${baseurl}/quiz/${qid}`)
  }

  public getSingleQuiz(qid:any){
    return this.http.get(`${baseurl}/quiz/${qid}`)
  }

  public getQuizzessOfCategory(cid:any){
    return this.http.get(`${baseurl}/quiz/category/${cid}`)
  }

  public getActiveQuizzes(){
    return this.http.get(`${baseurl}/quiz/active-quiz`)
  }

  public getActiveQuizzessOfCategory(cid:any){
    return this.http.get(`${baseurl}/quiz/active/category/${cid}`)
  }
  
}
