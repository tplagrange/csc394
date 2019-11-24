import { Component } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../_services';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials: TokenPayload = {
    email: '',
    password: ''
  };

  constructor(private auth: AuthenticationService, private router: Router) {
      localStorage.clear();
  }

  login() {
    this.auth.login(this.credentials).subscribe(() => {
        localStorage.setItem('email', this.credentials.email);
        this.router.navigateByUrl('/profile');
    }, (err) => {
      console.error(err);
    });
  }
}
