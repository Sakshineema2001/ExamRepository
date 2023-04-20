import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import baseurl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService implements OnInit {

  constructor(private http:HttpClient) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  public getQuestionsOfQuiz(qid:any){
   return this.http.get(`${baseurl}/questions/quiz/all/${qid}`)
  }

  public getQuestionsOfQuizForTest(qid:any){
    return this.http.get(`${baseurl}/questions/quiz/${qid}`)
  }

  public addQuestion(question:any){
    return this.http.post(`${baseurl}/questions/`,question)
  }

  public deleteQuestion(quesId:any){
    return this.http.delete(`${baseurl}/questions/${quesId}`)
  }

  public getSingleQuestion(quesid:any){
    return this.http.get(`${baseurl}/questions/${quesid}`)
  }

  public updateQuestions(question:any){
    return this.http.put(`${baseurl}/questions/`,question)
  }
}
