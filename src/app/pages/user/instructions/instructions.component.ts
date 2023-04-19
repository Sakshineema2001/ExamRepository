import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizzesService } from 'src/app/services/quizzes.service';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit{
qid:any;
quizz:any;
constructor(private route:ActivatedRoute,private quiz:QuizzesService){

}
  ngOnInit(): void {
   this.qid = this.route.snapshot.params['qid'];
   
   this.quiz.getSingleQuiz(this.qid).subscribe(
    (data:any) => {
      console.log(data)
      this.quizz=data;
   },(error) =>{
       console.log("something Went Wrong");
   })
  }
}
