import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  formIsVisible: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }
  toggleForm(): void { 
    this.formIsVisible = !this.formIsVisible;
  }
}
