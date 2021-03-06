import { Component } from '@angular/core';
import { AuthenticationService, UserDetails } from '../_services';

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  details: UserDetails;

  constructor(private auth: AuthenticationService) {}

  ngOnInit() {
    this.auth.profile().subscribe(user => {
      this.details = user;
      localStorage.setItem('user', user._id);
      localStorage.setItem('name', user.name)
    }, (err) => {
      console.error(err);
    });
  }
}
