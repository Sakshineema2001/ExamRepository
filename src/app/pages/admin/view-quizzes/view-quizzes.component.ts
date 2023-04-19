import { Component, OnInit } from '@angular/core';
import { QuizzesService } from 'src/app/services/quizzes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {

  constructor(private quizzes:QuizzesService){

  }

  quiz =[
    {
       qid:'',
       title:'',
       description:'',
       maxMarks:'',
       numberOfQuestions:'',
       active:'',
       category:{
        title:'',
       }
    },
]

  ngOnInit(): void {
    this.quizzes.getQuizzes().subscribe((data:any) =>{
      this.quiz=data;
      console.log(this.quiz)
    },(error:any) =>{
      console.log(error)
    })
  }

  deleteQuiz(qid:any){
    Swal.fire({icon:'info',title:'are you sure you want to delete?', confirmButtonText:'Delete',showCancelButton:true}).
    then((result:any) =>{
      if(result.isConfirmed){
        this.quizzes.deleteQuiz(qid).subscribe((data) =>{
            Swal.fire('Success','Successfully deleted','success')
            this.quiz = this.quiz.filter((quiz) => quiz.qid!= qid )
          },(error:any) =>{
            Swal.fire('Error','Something wrong in deleted','error')
            console.log(error)
          }
          )
      }
    })
  
  }

}
