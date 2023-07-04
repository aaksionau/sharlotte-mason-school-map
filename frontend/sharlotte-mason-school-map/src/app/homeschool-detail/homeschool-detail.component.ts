import { Component, Input, OnInit } from '@angular/core';
import { HomeSchool } from 'src/models/homeSchool';

@Component({
  selector: 'app-homeschool-detail',
  templateUrl: './homeschool-detail.component.html',
  styleUrls: ['./homeschool-detail.component.css']
})
export class HomeschoolDetailComponent implements OnInit {
  @Input() homeSchool: HomeSchool;
  constructor() {
    this.homeSchool = new HomeSchool();
  }
  homeSchoolId: string = '';
  showModal: boolean = false;
  ngOnInit(): void {
  }
  sendEmail(homeSchoolId: string): void {
    this.homeSchoolId = homeSchoolId;
    this.showModal = true;
  }

  changeStatus(): void {
    this.showModal = !this.showModal;
  }
}
