import { Component } from '@angular/core';
import { AuthenticationService } from './_services';
import { ChartsModule } from 'ng2-charts';
import { NgChartjsModule } from 'ng-chartjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	constructor(public auth: AuthenticationService) {};
    title = 'csc394';
}
