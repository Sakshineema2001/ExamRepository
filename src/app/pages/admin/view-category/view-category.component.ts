import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.css']
})
export class ViewCategoryComponent implements OnInit{

  constructor(private category:CategoryService){

  }

  categories=[
    {
    cid:'',
    title:'',
    description:''
    }
  ]

  ngOnInit(): void {
    this.category.getCategories().subscribe((data:any) =>{
      this.categories=data;
      console.log(this.categories)
    },(error:any)=>{
      console.log(error)
      Swal.fire('Error','Error in loading data','error')
    }
    )
  }


}
