import {Component} from '@angular/core';
import { MatIconRegistry  } from '@angular/material';
import { Router } from '@angular/router';
import { AuthenticationService, LightUser } from '../_services';

@Component({
        selector: 'edit-project',
        templateUrl: './project-edit.component.html',
        styleUrls: ['./project-edit.component.css']
    })

export class EditProjectComponent {
    projectName: string;
    userEmail: string

    constructor(private auth: AuthenticationService, private router: Router) {};

    ngOnInit() {
    }

    addUser() {
        // Give the user access to the project
        this.auth.patchUser(localStorage.getItem('project'), localStorage.getItem('user')).subscribe(user => {
            if (!user) {
                alert("Error Adding User")
            }
        }, (err) => {
            console.error(err);
        });

        var lu = {
            uid: "",
            uname: "",
            uemail: this.userEmail,
        }
        // Add the user to the project directory
        console.log("Please get the user with email: " + this.userEmail)
        this.auth.patchProject(lu, localStorage.getItem('project')).subscribe(project => {
        }, (err) => {
            console.error(err);
        });
    }

    back() {
        this.router.navigateByUrl('/');
    }
}
