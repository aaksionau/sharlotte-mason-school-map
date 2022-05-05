import { Component, Input, OnInit, Output } from '@angular/core';
import { IHomeSchool } from 'src/interfaces/IHomeSchool';
import { HomeschoolService } from 'src/services/homeschool.service';
import { EventEmitter } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { HomeSchool } from 'src/models/homeSchool';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-school',
  templateUrl: './add-school.component.html',
  styleUrls: ['./add-school.component.css']
})
export class AddSchoolComponent implements OnInit {

  constructor(
    private homeschoolService: HomeschoolService,
    private router: Router) { }
  @Input() formIsVisible?: boolean = false;
  @Output() getFormVisibleChange: EventEmitter<boolean> = new EventEmitter();

  homeschool: IHomeSchool = new HomeSchool();

  ngOnInit(): void {
    this.cleanForm();
  }
  toggleForm(): void { 
    this.cleanForm();
    this.formIsVisible = !this.formIsVisible;
    this.getFormVisibleChange.emit(this.formIsVisible);
  }
  addSchool(): void {
    this.errors = [];
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
    
      this.router.navigate(['/home']);
  }
  cleanForm(): void { 
    this.errors = [];
    this.homeschool = {
      id: '',
      firstName: '',
      familyName: '',
      cityName: '',
      state: 'MN',
      email: '',
      children: [],
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

  validateEmail(email:string): boolean {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  };
  errors: string[] = []

}
