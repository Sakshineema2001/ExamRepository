import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.css']
})
export class StartQuizComponent implements OnInit{

  constructor(private locationFor:LocationStrategy){

  }
  ngOnInit(): void {
    this.preventBackButton();
  }

  preventBackButton(){
    history.pushState(null, "", location.href)
    this.locationFor.onPopState(() =>{
      history.pushState(null, "", location.href)
    })
  }
}
