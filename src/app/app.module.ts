import { BrowserModule } from '@angular/platform-browser';
// import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

// Components
import { AlertComponent } from './_components';
import { ProfileComponent } from './_components';
import { LoginComponent } from './_components';
import { RegisterComponent } from './_components';
import { HomeComponent } from './_components';
import { TableRowComponent } from './_components';
import { TableComponent } from './_components';


// Services
import { AuthenticationService } from './_services';
import { AuthGuardService } from './_services';
import { AlertService } from './_services';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    TableRowComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    AlertService,
    AuthenticationService,
    AuthGuardService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
