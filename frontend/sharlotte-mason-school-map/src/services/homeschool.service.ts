import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { IHomeSchool } from 'src/interfaces/IHomeSchool';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { HomeSchool } from 'src/models/homeSchool';
import { Message } from 'src/models/message';
import { IMessageResult } from 'src/interfaces/IMessageResult';

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
  getHomeSchoolById(id: string): Observable<IHomeSchool> { 
    return this.http.get<IHomeSchool>(`${this.getHomeSchoolByIdUrl}?id=${id}`)
      .pipe(
        tap(_ => this.log('fetched school by id')),
        catchError(this.handleError<IHomeSchool>('getHomeSchoolById', new HomeSchool()))
    )
  }
  sendMessage(message: Message): Observable<IMessageResult> { 
    return this.http.post<IMessageResult>(this.sendMessageUrl, message, this.httpOptions)
      .pipe(
        tap((result: IMessageResult) => this.log(`result of sending message: ${result}`)),
        catchError(this.handleError<IMessageResult>('send message'))
      );
  }
  saveHomeSchool(homeschool: IHomeSchool): Observable<IHomeSchool> {
    return this.http.post<IHomeSchool>(this.addHomeSchoolUrl, homeschool, this.httpOptions).pipe(
      tap((newHomeschool: IHomeSchool) => this.log(`saved homeschool w/ id=${newHomeschool.id}`)),
      catchError(this.handleError<IHomeSchool>('saveHomeschool'))
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
  addHomeSchoolUrl = 'https://sharlottemasonschool.azurewebsites.net/api/SaveHomeSchool';
  getHomeSchoolByIdUrl = 'https://sharlottemasonschool.azurewebsites.net/api/GetHomeSchoolById';
  sendMessageUrl = 'https://sharlottemasonschool.azurewebsites.net/api/SendMessageToOwner';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
}
