import {
  Component,
  OnInit
} from '@angular/core';
import { MapMarker } from '@angular/google-maps';
import {
  IHomeSchool
} from 'src/interfaces/IHomeSchool';
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
  markers: MarkerGroup[] = [];
  homeschools: IHomeSchool[] = Array < IHomeSchool > ();
  groupedSchools: any;
  cityName: string = '';
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
  constructor(private homeSchoolService: HomeschoolService) {}

  ngOnInit(): void {
    this.getLocation();
    this.getHomeSchools();
  }

  getHomeSchools(): void {
    this.homeSchoolService.getHomeSchools()
      .subscribe(schools => {
        this.homeschools = schools;

        let mappedMarkers = this.homeschools.map(s => new Marker(s.latitude, s.longitude, s.cityName));
        let groupedMarkers = this.groupBy((mappedMarkers as Array<Marker>), (s: Marker) => s.text);
        groupedMarkers.forEach((value, key) => { 
          this.markers.push(new MarkerGroup(key, value.length, value[0].position));
        })
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
  getMarkersQuantity(values: []): number { 
    return values.length;
  }

  seeDetails(cityName: string) { 
    this.cityName = cityName;
    console.warn(cityName);
  }

  groupBy(list: Array <any> , keyGetter: Function): Map<string, Marker[]> {
    const map = new Map();
    list.forEach((item) => {
      const key = keyGetter(item);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });
    return map;
  }
}
