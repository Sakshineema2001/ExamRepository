import { LocationStrategy } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionsService } from 'src/app/services/questions.service';
import Swal from 'sweetalert2';
import swal from 'sweetalert2';

@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.css']
})
export class StartQuizComponent implements OnInit{

  qid:any;
  questions;
  marksGot = 0 ;
  attempted = 0;
  givenAnswer: any;
  correctAnswers = 0;

  isSubmit = false;

  constructor(private locationFor:LocationStrategy, private route:ActivatedRoute, private question:QuestionsService){

  }

  ngOnInit(): void {
    this.preventBackButton();
    this.qid = this.route.snapshot.params['qid'];
    console.log(this.qid)
    this.loadQuestions();
  }

  loadQuestions() {
     this.question.getQuestionsOfQuizForTest(this.qid).subscribe(
      (data)=>{
         this.questions = data;
         console.log(this.questions)
         this.questions.forEach((q:any) =>
         {
          q['givenAnswer'] = '';
         });
     },(error) =>{
      console.log("something went wrong")
      swal.fire('Error','Error while loading questions!!','error')
     })
  }

  preventBackButton(){
    history.pushState(null, "", location.href)
    this.locationFor.onPopState(() =>{
      history.pushState(null, "", location.href)
    })
  }

  submitQuiz(){
    Swal.fire({
      title: 'Do you want to Submit the quiz?',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      icon: 'info',
    }).then((e) => {
      /* Read more about isConfirmed, isDenied below */
      if (e.isConfirmed) {
        //calculation
        this.isSubmit = true;
           this.questions.forEach((q) =>{
              if(q.givenAnswer == q.answer){
                this.correctAnswers++;
                let marksSingle = this.questions[0].quiz.maxMarks / this.questions.length;
                this.marksGot += marksSingle;
              }
              if(q.givenAnswer.trim() != ""){
                this.attempted++;
              }
           });
      } 
    });
  }

  printPage() {
  window.print();
  }
}
