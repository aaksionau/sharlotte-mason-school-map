import { Component, OnInit } from '@angular/core';
import { HomeSchool } from 'src/models/homeSchool';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  formIsVisible: boolean = false;
  homeSchools: HomeSchool[] = [];
  isMapView: boolean = true;
  constructor() { }

  ngOnInit(): void {
  }
  toggleForm(): void { 
    this.formIsVisible = !this.formIsVisible;
  }

  updateResults(homeSchools: HomeSchool[]){
    this.homeSchools = homeSchools;
  }
  switchView(isMapView: boolean){
    this.isMapView = isMapView;
  }
}
