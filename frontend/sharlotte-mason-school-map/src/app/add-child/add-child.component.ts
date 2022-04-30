import { Component, Input, OnInit } from '@angular/core';
import { IChild } from 'src/interfaces/IChild';
import { IHomeSchool } from 'src/interfaces/IHomeSchool';
import {v4 as uuidv4} from 'uuid';

@Component({
  selector: 'app-add-child',
  templateUrl: './add-child.component.html',
  styleUrls: ['./add-child.component.css']
})
export class AddChildComponent implements OnInit {

  constructor() { }
  ngOnInit(): void {
  }
  @Input() homeschool?: IHomeSchool;


  addChild(): void { 
    this.homeschool?.children.push({ yearOfBirth: 2010, gender: 0, id: uuidv4()} as IChild);
  }

  removeChild(id: string): void { 
    if (this.homeschool == undefined) return;

    this.homeschool.children = this.homeschool.children.filter(s=>s.id != id);
  }
}
