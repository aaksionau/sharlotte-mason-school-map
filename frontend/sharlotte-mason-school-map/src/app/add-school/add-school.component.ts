import { Component, OnInit } from '@angular/core';
import { IHomeSchool } from 'src/interfaces/IHomeSchool';

@Component({
  selector: 'app-add-school',
  templateUrl: './add-school.component.html',
  styleUrls: ['./add-school.component.css']
})
export class AddSchoolComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  homeschool: IHomeSchool = {
    id: '',
    firstName: '',
    familyName: '',
    cityName: '',
    state: '',
    email: '',
    children: [],
    interestedTopics: '',
    longitude: 0,
    latitude: 0,
    added: new Date()
  }
}
