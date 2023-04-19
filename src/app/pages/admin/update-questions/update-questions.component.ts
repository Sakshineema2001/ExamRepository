import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuestionsService } from 'src/app/services/questions.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-questions',
  templateUrl: './update-questions.component.html',
  styleUrls: ['./update-questions.component.css']
})
export class UpdateQuestionsComponent implements OnInit{
  
  constructor(private questions:QuestionsService,private route:ActivatedRoute,private cat:CategoryService,private router:Router){
    
  }
 
  categories:any;
  quesId=0;
  question:any;

  ngOnInit(): void {
   this.quesId= this.route.snapshot.params['quesId'];
   this.questions.getSingleQuestion(this.quesId).subscribe((data:any) =>{
    this.question=data;
    console.log(this.question)
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
    this.questions.updateQuestions(this.question).subscribe((data:any) =>{
      Swal.fire('Success','Quiz updated','success')
      this.router.navigate(['/admin/questions'])
     },(error:any) =>{
          Swal.fire('Error','something went wrong','error')
     })
  }
}

