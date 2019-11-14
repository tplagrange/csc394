import { Component } from '@angular/core';
import { AuthenticationService } from '../_services';

@Component({
  templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {
	constructor(public auth: AuthenticationService) {};
}
