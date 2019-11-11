import { BrowserModule } from '@angular/platform-browser';
// import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule } from 'ng2-charts'
// Material
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material';
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';


// Components
import { AlertComponent } from './_components';
import { ProfileComponent } from './_components';
import { LoginComponent } from './_components';
import { RegisterComponent } from './_components';
import { HomeComponent } from './_components';
import { TableRowComponent } from './_components';
import { TableComponent } from './_components';
import { MyLineChartComponent } from './_components';

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
    //TableRowComponent,
        TableComponent,
    MyLineChartComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    HttpClientModule,
     RouterModule.forRoot(routes),
    ChartsModule
  ],
  providers: [
    AlertService,
    AuthenticationService,
    AuthGuardService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
