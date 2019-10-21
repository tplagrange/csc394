import { Component } from '@angular/core';
import { AuthenticationService } from '../_services';

@Component({
  templateUrl: './home.component.html'
})
export class HomeComponent {
	constructor(public auth: AuthenticationService) {};
}
