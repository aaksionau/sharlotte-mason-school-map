import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FilterOptions } from 'src/helpers/filterOptions';
import { HomeSchool } from 'src/models/homeSchool';
import { HomeschoolService } from 'src/services/homeschool.service';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {

  constructor(private homeSchoolService: HomeschoolService) { }
  filterOptions: FilterOptions = new FilterOptions();
  homeSchools: HomeSchool[] = [];
  @Output() onSearch = new EventEmitter<HomeSchool[]>();
  ngOnInit(): void {
    this.getHomeSchools('');
  }
  emittedNameByCitySearch(city: string) {
    this.filterOptions.cityName = city;
  }
  getCity(place: any) {
    const COMPONENT_TEMPLATE = { locality: 'long_name' };
    const city = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    this.filterOptions.cityName = city;
    return city;
  }
  getAddrComponent(place: any, componentTemplate: any) {
    let result;

    for (let i = 0; i < place.address_components.length; i++) {
      const addressType = place.address_components[i].types[0];
      if (componentTemplate[addressType]) {
        result = place.address_components[i][componentTemplate[addressType]];
        return result;
      }
    }
    return;
  }

  getHomeSchools(city: string | any): void {
    this.homeSchoolService.getHomeSchools()
      .subscribe(schools => {

        let mappedSchools = schools.map(s => new HomeSchool().mapSchool(s));
        this.homeSchools = mappedSchools;
        if (city !== '')
          this.homeSchools = mappedSchools.filter(s => s.cityName.toLowerCase().includes(city.toLowerCase()));

        if (this.filterOptions.interestCMBookStudy)
          this.homeSchools = this.homeSchools.filter(s => s.interestCMBookStudy);

        if (this.filterOptions.interestCoop)
          this.homeSchools = this.homeSchools.filter(s => s.interestCoop);

        if (this.filterOptions.interestFriends)
          this.homeSchools = this.homeSchools.filter(s => s.interestFriends);

        if (this.filterOptions.interestNatureWalks)
          this.homeSchools = this.homeSchools.filter(s => s.interestNatureWalks);
        this.onSearch.emit(this.homeSchools);
      });
  }
  resetForm() {
    this.filterOptions.reset();
    this.getHomeSchools('');
  }
}
