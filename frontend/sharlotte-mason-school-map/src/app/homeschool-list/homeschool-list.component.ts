import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { FilterOptions } from 'src/helpers/filterOptions';
import { HomeSchool } from 'src/models/homeSchool';
import { Marker } from 'src/models/marker';
import { MarkerGroup } from 'src/models/markerGroup';
import { HomeschoolService } from 'src/services/homeschool.service';

@Component({
  selector: 'app-homeschool-list',
  templateUrl: './homeschool-list.component.html',
  styleUrls: ['./homeschool-list.component.css']
})
export class HomeschoolListComponent implements OnInit, OnChanges {

  constructor(private homeSchoolService: HomeschoolService) { }
  homeSchools: HomeSchool[] = [];
  markers: MarkerGroup[] = [];
  groupedSchools: any;
  homeSchoolId: string = '';
  cityName: string = '';
  filterOptions: FilterOptions = new FilterOptions();
  zoom = 10;
  center: google.maps.LatLngLiteral | any;
  options: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    zoomControl: true,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 21,
    minZoom: 3,
  }
  showModal: boolean = false;
  ngOnInit(): void {
    this.getLocation();
    this.getHomeSchools(this.cityName);
  }
  emittedNameByCitySearch(city: string) {
    this.cityName = city;
  }
  sendEmail(homeSchoolId: string): void { 
    this.homeSchoolId = homeSchoolId;
    this.showModal = true;
  }
  getHomeSchools(city: string | any): void {
    this.cityName = city;
    this.homeSchoolService.getHomeSchools()
      .subscribe(schools => {
        let mappedSchools = schools.map(s => new HomeSchool().mapSchool(s));


        if (city == 'reset') { 
          this.filterOptions.reset();
          this.cityName = '';
        }

        if (city && city != 'reset')
          this.homeSchools = mappedSchools.filter(s => s.cityName.toLowerCase() === city.toLowerCase());
        else
          this.homeSchools = mappedSchools;
        
          if (this.filterOptions.interestCMBookStudy)
            this.homeSchools = this.homeSchools.filter(s => s.interestCMBookStudy);
          
          if (this.filterOptions.interestCoop)
            this.homeSchools = this.homeSchools.filter(s => s.interestCoop);
          
          if (this.filterOptions.interestFriends)
            this.homeSchools = this.homeSchools.filter(s => s.interestFriends);
          
          if (this.filterOptions.interestNatureWalks)
            this.homeSchools = this.homeSchools.filter(s => s.interestNatureWalks);
        
        this.updateMap();
      });
  }
  changeStatus(): void { 
    this.showModal = !this.showModal;
  }
  updateMap(): void {
    this.markers = [];
    this.homeSchoolService.getHomeSchools()
      .subscribe(schools => {
        let mappedMarkers = this.homeSchools.map(s => new Marker(s.latitude, s.longitude, s.cityName));
        let groupedMarkers = this.groupBy((mappedMarkers as Array<Marker>), (s: Marker) => s.text);
        groupedMarkers.forEach((value, key) => { 
          this.markers.push(new MarkerGroup(key, value.length, value[0].position));
        })
      });
  }


  ngOnChanges(changes: SimpleChanges) {
    this.cityName = changes['cityName'].currentValue;
    this.getHomeSchools(this.cityName);
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
      this.center = {
        lat: 44.8229993,
        lng: 92.9076105,
      }
    }
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
