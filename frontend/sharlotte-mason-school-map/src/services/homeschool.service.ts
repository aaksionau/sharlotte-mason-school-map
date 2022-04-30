import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  addHomeSchool(homeschool: IHomeSchool): Observable<IHomeSchool> {
    return this.http.post<IHomeSchool>(this.addHomeSchoolUrl, homeschool, this.httpOptions).pipe(
      tap((newHomeschool: IHomeSchool) => this.log(`added homeschool w/ id=${newHomeschool.id}`)),
      catchError(this.handleError<IHomeSchool>('addnewHomeschool'))
    );
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
  addHomeSchoolUrl = 'https://sharlottemasonschool.azurewebsites.net/api/AddHomeSchool';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
}
