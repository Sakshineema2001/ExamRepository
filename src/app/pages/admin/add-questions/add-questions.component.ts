import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { QuestionsService } from 'src/app/services/questions.service';
import Swal from 'sweetalert2';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';



@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.css']
})
export class AddQuestionsComponent implements OnInit{

  public Editor = ClassicEditor;
  
  question = {
    quiz: {
      qid:'',
      title:''
    },
    content: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: ''
  } 

  constructor(private route:ActivatedRoute,private questions:QuestionsService,private router:Router){

  }

  ngOnInit(): void {
    this.question.quiz.qid = this.route.snapshot.params['qid']
   this.question.quiz['qid'] = this.question.quiz.qid;
   this.question.quiz.title = this.route.snapshot.params['title']
   this.question.quiz['title'] =this.question.quiz.title;
   console.log(this.question.quiz.qid)    
  }


  addQuestions(){
    this.questions.addQuestion(this.question).subscribe((data:any) =>{
      console.log(data)
      Swal.fire('success','Question successfully Added','success')
      this.router.navigate(['/admin/questions/'+ this.question.quiz.qid + '/' + this.question.quiz.title])
    },(error:any) =>{
      Swal.fire('Error','Something Went Wrong','error')
    })
  }

}
