import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { HomeSchool } from 'src/models/homeschool';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HomeschoolService {

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getHomeSchools(): Observable<HomeSchool[]> {
    return this.http.get<HomeSchool[]>(this.homeSchoolsUrl)
      .pipe(
        tap(_ => this.log('fetched schools')),
        catchError(this.handleError<HomeSchool[]>('getHomeSchools', []))
    )
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);
  
      return of(result as T);
    };
  }
  private log(message: string) {
    this.messageService.add(`HomeschoolService: ${message}`);
  }

  homeSchoolsUrl = 'https://sharlottemasonschool.azurewebsites.net/api/GetHomeSchools';
}
