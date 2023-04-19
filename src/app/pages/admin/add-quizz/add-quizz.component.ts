import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizzesService } from 'src/app/services/quizzes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quizz',
  templateUrl: './add-quizz.component.html',
  styleUrls: ['./add-quizz.component.css']
})
export class AddQuizzComponent implements OnInit{

constructor(private quizz:QuizzesService,private snack:MatSnackBar,private cat:CategoryService){

}

quiz ={
     title:'',
     description:'',
     maxMarks:'',
     numberOfQuestions:'',
     active:true,
     category:{
      cid:''
     },
  }

  categories =[
    {
      cid:'',
      title:''
    }
  ]


  ngOnInit(): void {
    this.cat.getCategories().subscribe((data:any) =>{
      this.categories = data;
      console.log(this.categories)
    },(error:any) =>{
      this.snack.open('something went wrong','',{
        duration:3000
      })
    }
    )
  }
  addQuiz(){
    console.log(this.quiz)
    if(this.quiz.title =='' || this.quiz.title==null ){
      this.snack.open('title is required','',{
        duration:3000
      })
      return;
    }
    this.quizz.addQuizz(this.quiz).subscribe((data:any)=>{
      console.log(data)
      this.quiz.title='',
      this.quiz.description='',
      this.quiz.maxMarks='',
      this.quiz.numberOfQuestions='',
      Swal.fire('success','Quiz successfully Added','success')
    })
  }

}
