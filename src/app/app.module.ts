import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { BrowserModule } from '@angular/platform-browser';

import { SidebarModule } from './sidebar/sidebar.module';
import { NavbarModule} from './shared/navbar/navbar.module';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

import {MatCardModule} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule, MatStepperModule, MatInputModule, MatButtonModule, MatAutocompleteModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/app.states';


@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes, {
      useHash: true
    }),
    SidebarModule,
    NavbarModule,
    BrowserModule,
    MatCardModule,
    MatFormFieldModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    MatInputModule,
    MatStepperModule,
    MatButtonModule,
    MatAutocompleteModule,
    StoreModule.forRoot(reducers, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    // MatTableModule,
    // MatPaginatorModule,
    // MatSortModule

    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
