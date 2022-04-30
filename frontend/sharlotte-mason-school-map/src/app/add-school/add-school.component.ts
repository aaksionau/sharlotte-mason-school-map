import { Component, OnInit } from '@angular/core';
import { IHomeSchool } from 'src/interfaces/IHomeSchool';
import { HomeschoolService } from 'src/services/homeschool.service';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-add-school',
  templateUrl: './add-school.component.html',
  styleUrls: ['./add-school.component.css']
})
export class AddSchoolComponent implements OnInit {

  constructor(private homeschoolService: HomeschoolService) { }

  ngOnInit(): void {

  }
  formIsVisible: boolean = false;
  toggleForm(): void { 
    this.formIsVisible = !this.formIsVisible;
  }
  addSchool(): void {
    if (!this.homeschool.familyName) {
      this.errors.push("Family name is required");
    }
    if (!this.homeschool.cityName) {
      this.errors.push("City name is required");
    }
    if (!this.homeschool.email || !this.validateEmail(this.homeschool.email)) { 
      this.errors.push('Email address is required and need to be correct');
    }

    if (this.errors.length > 0) return;

    this.homeschoolService.addHomeSchool(this.homeschool)
      .subscribe(result => console.warn(result));
  }
  validateEmail(email:string): boolean {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  };
  errors: string[] = []
  homeschool: IHomeSchool = {
    id: '',
    firstName: '',
    familyName: '',
    cityName: '',
    state: 'MN',
    email: '',
    children: [{
      id: uuidv4(),
      yearOfBirth: 2010,
      gender: 0
    }],
    interestedTopics: '',
    longitude: 0,
    latitude: 0,
    added: new Date(),
    interestCMBookStudy: '',
    interestCoop: '',
    interestNatureWalks: '',
    interestMentoring: '',
    interestFriendship: ''
  }
}
