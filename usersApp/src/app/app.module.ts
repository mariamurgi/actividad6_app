import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FormComponent } from './components/form/form.component';
import { Error404Component } from './components/error404/error404.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { UsersListComponent } from './components/user-list/user-list.component';
import { UserViewComponent } from './components/user-view/user-view.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserPopupComponent } from './components/user-popup/user-popup.component';

@NgModule({
  declarations: [
    AppComponent,
    /* Used to display the header. */
    HeaderComponent,
    /* A component that is used to create a form. */
    FormComponent,
    /* A component that is used to display a 404 error. */
    Error404Component,
    /* A component that is used to display a card of users. */
    UserCardComponent,
  /* A component that is used to display a list of users. */
  UsersListComponent,
    /* A component that is used to display the user view. */
    UserViewComponent,
    /* A component that is used to display the footer. */
    FooterComponent,
    UserPopupComponent
  ],
  imports: [
    BrowserModule,
  /* A module that is used to create routes. */
  AppRoutingModule,
  RouterModule,
    /* A module that is used to make HTTP requests. */
    HttpClientModule,
    /* A module that is used to create forms. */
    ReactiveFormsModule,
    /* A module that is used to create forms. */
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
