import {
  Component,
  OnInit
} from '@angular/core';
import {
  HomeSchool
} from 'src/models/homeschool';
import {
  Marker
} from 'src/models/marker';
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
  markers: Marker[] = [];
  zoom = 12;
  center: google.maps.LatLngLiteral | any;
  options: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    zoomControl: true,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
  }
  constructor(private homeSchoolService: HomeschoolService) {

  }
  ngOnInit(): void {
    this.getLocation();
    this.getHomeSchools();
  }
  getHomeSchools(): void {
    this.homeSchoolService.getHomeSchools()
      .subscribe(schools => {
        this.markers = schools.map(s => {
          return new Marker(s.latitude, s.longitude, s.familyName);
        });
      });
  }
  getLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }
      })
    } else {
      console.log("No support for geolocation")
    }
  }
}
