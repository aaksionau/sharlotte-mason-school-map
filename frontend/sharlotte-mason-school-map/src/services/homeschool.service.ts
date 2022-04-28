import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { IHomeSchool } from 'src/interfaces/IHomeSchool';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HomeschoolService {

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getHomeSchools(): Observable<IHomeSchool[]> {
    return this.http.get<IHomeSchool[]>(this.homeSchoolsUrl)
      .pipe(
        tap(_ => this.log('fetched schools')),
        catchError(this.handleError<IHomeSchool[]>('getHomeSchools', []))
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
