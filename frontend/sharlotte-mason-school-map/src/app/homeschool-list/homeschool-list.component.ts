import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { IHomeSchool } from 'src/interfaces/IHomeSchool';
import { HomeschoolService } from 'src/services/homeschool.service';

@Component({
  selector: 'app-homeschool-list',
  templateUrl: './homeschool-list.component.html',
  styleUrls: ['./homeschool-list.component.css']
})
export class HomeschoolListComponent implements OnInit, OnChanges {

  @Input() cityName?: string;
  constructor(private homeSchoolService: HomeschoolService) { }
  homeSchools: IHomeSchool[] = [];
  ngOnInit(): void {
    this.getHomeSchools(this.cityName);
  }
  getHomeSchools(city: string | any): void {
    this.homeSchoolService.getHomeSchools()
      .subscribe(schools => {
        this.homeSchools = schools.filter(s => s.cityName === city);
        console.warn(schools);
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    const city = changes['cityName'].currentValue;
    this.getHomeSchools(city);
  }
}
