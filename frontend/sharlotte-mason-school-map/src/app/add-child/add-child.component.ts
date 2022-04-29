import { Component, OnInit } from '@angular/core';
import { IChild } from 'src/interfaces/IChild';

@Component({
  selector: 'app-add-child',
  templateUrl: './add-child.component.html',
  styleUrls: ['./add-child.component.css']
})
export class AddChildComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  child: IChild = { 
    yearOfBirth: 0,
    gender: 0
  }
}
