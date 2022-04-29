import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { HttpClientModule } from '@angular/common/http'; 
import { CommonModule } from '@angular/common';
import { HomeschoolListComponent } from './homeschool-list/homeschool-list.component';
import { AddSchoolComponent } from './add-school/add-school.component';
import { FormsModule } from '@angular/forms';
import { AddChildComponent } from './add-child/add-child.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeschoolListComponent,
    AddSchoolComponent,
    AddChildComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GoogleMapsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
