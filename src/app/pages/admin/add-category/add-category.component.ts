import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit{

  constructor(private category:CategoryService, private  snack:MatSnackBar){  }

  public categories ={
    title: '',
    description: ''

   }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  add(){
    console.log(this.categories);
    if(this.categories.title=='' || this.categories.title==null){
      this.snack.open('title is required','',{
        duration:3000
      })
      return;
    }
    this.category.addCategories(this.categories).subscribe(
      (data:any) =>{
      console.log(data)
      this.categories.title='',
      this.categories.description=''
      Swal.fire('success','category successfully Added','success')
    }, (error:any) =>{
      this.snack.open('something went wrong','',{
        duration:3000
      })
    }
    )
  }
}
