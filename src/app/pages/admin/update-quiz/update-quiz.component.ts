import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizzesService } from 'src/app/services/quizzes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit{
  
  constructor(private quizz:QuizzesService,private route:ActivatedRoute,private cat:CategoryService,private router:Router){
    
  }

  categories:any;
  qid=0;
  quiz:any;
  
  ngOnInit(): void {
   this.qid= this.route.snapshot.params['qid'];
   this.quizz.getSingleQuiz(this.qid).subscribe((data:any) =>{
    this.quiz=data;
    console.log(this.quiz)
   },(error:any) =>{
        alert('something went wrong')
   });

   this.cat.getCategories().subscribe((data:any) =>{
    this.categories=data;
    console.log(this.categories)
   },(error:any) =>{
    alert('something went wrong')
});
  }
  updateData(){
    this.quizz.updateQuiz(this.quiz).subscribe((data:any) =>{
      Swal.fire('Success','Quiz updated','success')
      this.router.navigate(['/admin/quizzes'])
     },(error:any) =>{
          Swal.fire('Error','something went wrong','error')
     })
  }
}
