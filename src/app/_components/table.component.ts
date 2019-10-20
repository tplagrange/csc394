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
        this.columns = ["Assigned To", "Task ID", "Description", "Status", "Reviewed By", "Due Date", "Rating"];
        this.tasks = new Array(0);
        this.auth.tasks().subscribe(tasklist => {
            tasklist.forEach(task => {
                this.tasks.push(task);
            });
        }, (err) => {
            console.error(err);
        });
    }

}
