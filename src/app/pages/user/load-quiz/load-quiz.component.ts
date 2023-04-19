import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizzesService } from 'src/app/services/quizzes.service';
import { __param } from 'tslib';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit{

  catId: any;
  quizz:any;
  constructor(private route:ActivatedRoute,private quiz:QuizzesService){
  }
  ngOnInit(): void {
  this.route.params.subscribe((params) => {
    this.catId = params['catId'];
    if(this.catId == 0){
      console.log("Load All the quizzes");
      this.quiz.getActiveQuizzes().subscribe(
        (data:any) =>{
          this.quizz=data;
          console.log(data)
        },(error) =>{
          console.log("Error While Loading......")
        })
     }else{
      console.log("Load specific quiz")
      this.quiz.getActiveQuizzessOfCategory(this.catId).subscribe((data:any) =>{
        this.quizz=data;
      },(error) =>{
        console.log("Something Went Wrong")
      })
     }
   });
  }
}
