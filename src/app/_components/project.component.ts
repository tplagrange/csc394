import {Component} from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, ProjectPackage } from '../_services';
import { Project } from '../_classes';

@Component({
    selector: 'app-project',
    templateUrl: './project.component.html',
    styleUrls: ['./project.component.css']
  })

export class ProjectComponent {
    name: string

    constructor(private auth: AuthenticationService, private router: Router) {};

    setProjectName() {
        // This is where the creation logic should go for the new project with the name
        if (!this.name) {
            this.name = "New Project"
        }

        var project = new Project({
            _id: 'asdasd',
            name: this.name
        });

        this.auth.postProject(new ProjectPackage(project, localStorage.getItem('user'))).subscribe(proj => {
            // Give the user access to the project
            this.auth.patchUser(proj, localStorage.getItem('user')).subscribe(user => {
                this.router.navigateByUrl('/');
            }, (err) => {
                console.error(err);
            });
        }, (err) => {
            console.error(err);
        });
    }
}
