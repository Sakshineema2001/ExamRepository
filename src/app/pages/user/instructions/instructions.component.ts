import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router} from '@angular/router';
import { QuizzesService } from 'src/app/services/quizzes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit{
qid:any;
quizz:any;
constructor(private route:ActivatedRoute,private quiz:QuizzesService, private router:Router){

}
  ngOnInit(): void {
   this.qid = this.route.snapshot.params['qid'];
   
   this.quiz.getSingleQuiz(this.qid).subscribe(
    (data:any) => {
      console.log(data)
      this.quizz=data;
   },(error) =>{
       console.log("something Went Wrong");
   });
  }

  startClick() {
    Swal.fire({
      title: 'Do you want to Start the quiz?',
      showCancelButton: true,
      confirmButtonText: 'Start',
      icon: 'info',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.router.navigate(['/start/' + this.qid])
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
 }

}
