import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { HomeSchool } from 'src/models/homeSchool';

@Component({
  selector: 'app-homeschool-list',
  templateUrl: './homeschool-list.component.html',
  styleUrls: ['./homeschool-list.component.css']
})
export class HomeschoolListComponent implements OnInit {

  constructor() {
    this.homeSchools = [];
    this.isListView = false;
  }

  @Input() homeSchools: HomeSchool[];
  @Input() isListView: boolean;
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
