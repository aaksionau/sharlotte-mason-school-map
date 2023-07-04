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
  @Input() forMap: boolean = false;
  showModal: boolean = false;
  ngOnInit(): void {
  }
}
