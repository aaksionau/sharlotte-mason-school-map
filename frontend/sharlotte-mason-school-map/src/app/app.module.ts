import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { HttpClientModule } from '@angular/common/http'; 
import { CommonModule } from '@angular/common';
import { HomeschoolListComponent } from './homeschool-list/homeschool-list.component';
import { SchoolFormComponent } from './school-form/school-form.component';
import { FormsModule } from '@angular/forms';
import { ChildComponent } from './child/child.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'homeschool', component: SchoolFormComponent },
  { path: 'homeschool/:id', component: SchoolFormComponent},
  { path: '', redirectTo: '/home', pathMatch:'full' }
];
@NgModule({
  declarations: [
    AppComponent,
    HomeschoolListComponent,
    SchoolFormComponent,
    ChildComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GoogleMapsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
