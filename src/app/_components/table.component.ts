import { Component, OnInit } from '@angular/core';
import { AuthenticationService, TaskDetails } from '../_services';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html'
})

export class TableComponent {

    columns: string[];
    tasks: TaskDetails[]

    constructor(private auth: AuthenticationService) {}

    ngOnInit() {
        this.columns = this.auth.columns()
        this.tasks = new Array(0);
        this.auth.tasks().subscribe(taskArray => {
          this.tasks = taskArray;
        }, (err) => {
          console.error(err);
        });
    }

}
