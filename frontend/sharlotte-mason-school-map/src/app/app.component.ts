import {
  Component,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { MapMarker } from '@angular/google-maps';
import {
  IHomeSchool
} from 'src/interfaces/IHomeSchool';
import { HomeSchool } from 'src/models/homeSchool';
import {
  Marker
} from 'src/models/marker';
import { MarkerGroup } from 'src/models/markerGroup';
import {
  HomeschoolService
} from 'src/services/homeschool.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'sharlotte-mason-school-map';

  formIsVisible: boolean = false;

  constructor(private homeSchoolService: HomeschoolService) {}

  ngOnInit(): void {
  }
  toggleForm(): void { 
    this.formIsVisible = !this.formIsVisible;
  }
}
