import { Component, Input, OnInit, Output } from '@angular/core';
import { IHomeSchool } from 'src/interfaces/IHomeSchool';
import { HomeschoolService } from 'src/services/homeschool.service';
import { EventEmitter } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { HomeSchool } from 'src/models/homeSchool';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-school-form',
  templateUrl: './school-form.component.html',
  styleUrls: ['./school-form.component.css']
})
export class SchoolFormComponent implements OnInit {

  constructor(
    private homeschoolService: HomeschoolService,
    private router: Router,
    private route: ActivatedRoute) { }
  @Input() formIsVisible?: boolean = false;

  homeschool: IHomeSchool = new HomeSchool();
  ngOnInit(): void {
    this.cleanForm();
  }
  emittedNameByCitySearch(city: string) {
    this.homeschool.cityName = city;
  }
  getHomeSchool(): void { 
    this.homeschoolService.getHomeSchoolById(this.homeschool.id)
      .subscribe(school => { 
        this.homeschool = new HomeSchool().mapSchool(school);
        if(school.id == ''){
          this.errors.push("Family wasn't found");
        }
      })
  }
  clearErrors(): void{
    this.errors = [];
  }
  saveSchool(): void {
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

    this.homeschoolService.saveHomeSchool(this.homeschool)
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
      leadingGroupsText: '',
      longitude: 0,
      latitude: 0,
      added: new Date(),
      leadingCMBookStudy: '',
      leadingCoop: '',
      leadingNatureWalks: '',
      leadingMentoring: '',
      leadingOther: '',

      interestCMBookStudy: false,
      interestCoop: false,
      interestNatureWalks: false,
      interestFriends: false
    }
  }

  validateEmail(email:string): boolean {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  };
  errors: string[] = []

}
