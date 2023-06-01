import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { HttpClientModule } from '@angular/common/http';
import { HomeschoolListComponent } from './homeschool-list/homeschool-list.component';
import { SchoolFormComponent } from './school-form/school-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChildComponent } from './child/child.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { MessageComponent } from './message/message.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { SearchFormComponent } from './search-form/search-form.component';
import { HomeschoolMapComponent } from './homeschool-map/homeschool-map.component';
import { ViewSwitcherComponent } from './view-switcher/view-switcher.component';
import { AutocompleteComponent } from './auto-complete-search/auto-complete-search.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'homeschool', component: SchoolFormComponent },
  { path: 'homeschool/:id', component: SchoolFormComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];
@NgModule({
  declarations: [
    AppComponent,
    HomeschoolListComponent,
    SchoolFormComponent,
    ChildComponent,
    HomeComponent,
    MessageComponent,
    SearchFormComponent,
    HomeschoolMapComponent,
    ViewSwitcherComponent,
    AutocompleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GoogleMapsModule,
    AutocompleteLibModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes,
      { useHash: true }, // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
