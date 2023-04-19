import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionsService } from 'src/app/services/questions.service';
import { QuizzesService } from 'src/app/services/quizzes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

constructor(private quest:QuizzesService,private route:ActivatedRoute,private question:QuestionsService,private router:Router){
   
}

qid:any;
title:any;
questions=[{
  quesId:'',
  content:'',
  option1:'',
  option2:'',
  option3:'',
  option4:'',
  answer:''
}
];

  ngOnInit(): void {
   this.qid =  this.route.snapshot.params['qid'];
   this.title = this.route.snapshot.params['title'];
   this.question.getQuestionsOfQuiz(this.qid).subscribe((data:any) =>  {
    this.questions=data;
    console.log(this.questions);
   },(error:any) =>{
    Swal.fire('Error','Something Went Wrong','error')
   })
  }

  deleteQuestion(quesId:any){
      this.question.deleteQuestion(quesId).subscribe((data:any) =>{
        Swal.fire('success','successfully deleted','success')
        this.questions = this.questions.filter((questions) => questions.quesId!= quesId )
        this.router.navigate(['/admin/questions/'+ this.qid + '/' + this.title])
      },(error:any) =>{
        Swal.fire('Error','something went wrong','error')
      })
  }

}
