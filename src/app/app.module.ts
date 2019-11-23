import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbChatModule, NbLayoutModule } from '@nebular/theme';

// Charts
import { ChartsModule } from 'ng2-charts';
import { NgChartjsModule } from 'ng-chartjs';

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
import { AppComponent } from './app.component';
import { AlertComponent } from './_components';
import { ProfileComponent } from './_components';
import { LoginComponent } from './_components';
import { RegisterComponent } from './_components';
import { HomeComponent } from './_components';
import { ChatComponent } from './_components';
import { TableComponent } from './_components';
import { MyLineChartComponent } from './_components';
import { ProjectComponent } from './_components';

// Services
import { AuthenticationService } from './_services';
import { AuthGuardService } from './_services';
import { AlertService } from './_services';
import { from } from 'rxjs';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate:[AuthGuardService]},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
  { path: 'project', component: ProjectComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    ChatComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    TableComponent,
    MyLineChartComponent,
    ProjectComponent,
  ],
  imports: [
    BrowserModule,
    ChartsModule,
    HttpModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatSelectModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ChartsModule,
    NgChartjsModule,
    NbLayoutModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbChatModule,
  ],
  providers: [
    AlertService,
    AuthenticationService,
    AuthGuardService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
