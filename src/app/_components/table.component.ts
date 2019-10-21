import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatIconRegistry  } from '@angular/material';
import { AuthenticationService, TaskDetails } from '../_services';
import { Task } from '../_classes';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['/table-component.css']
})

export class TableComponent {

    // API Returned Variables
    tasks: Task[]

    // DataSource and Column names for table
    dsTasks: MatTableDataSource<Task>;
    dcTasks = ["assignedTo", "description", "status", "reviewedBy", "dueDate", "rating"];

    // UI Variables
    selectedTask: Task;

    // Flags that control the expansion panel
    f_firstPanel = false;
    f_secondPanel = false;

    constructor(private auth: AuthenticationService) {
        this.dsTasks = new MatTableDataSource<Task>();
        this.tasks = new Array();
    }

    ngOnInit() {
        this.auth.tasks().subscribe(taskArray => {
            // console.log("Returning tasks")
            for (let taskItem of taskArray) {
                this.tasks.push(new Task(taskItem));
            }
        }, (err) => {
            console.error(err);
        });

        this.f_firstPanel = true;
        this.updateTableTasks();
    }

    editTask(task: Task) {
        // this.selectedTask = trainer;
        this.selectedTask = JSON.parse(JSON.stringify(task));
        this.f_firstPanel = false;
        this.f_secondPanel = true;
    }

    cancelEdit() {
        this.f_firstPanel = true;
        this.f_secondPanel = false;
        this.selectedTask = null;
    }

    finishEdit() {
        this.f_firstPanel = true;
        this.f_secondPanel = false;
        const index = this.findIndexofTask();
        this.dsTasks[index] = this.selectedTask;
        this.updateTableTasks();
        this.selectedTask = null;
    }

    findIndexofTask(): number {
      const index = this.tasks.
        findIndex(t => t._id === this.selectedTask._id);
      return index;
    }

    updateTableTasks() {
        this.dsTasks.data = this.tasks;
    }
}
