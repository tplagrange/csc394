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
            // console.log("Returning tasks")
            // console.log(taskArray)
          this.tasks = taskArray;
        }, (err) => {
          console.error(err);
        });
    }

<<<<<<< Updated upstream
=======
    finishEdit() {
        this.f_firstPanel = true;
        this.f_secondPanel = false;
        const index = this.findIndexofTask();
        this.tasks[index] = this.selectedTask;
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
        //console.log(this.dsTasks);
        //console.log(this.dsTasks.data);
        
    }

    setDescription() {
        this.selectedTask.description = this.currentDescription;
        this.auth.setTaskDescription(this.selectedTask).subscribe(updatedTask => {
            console.log("Updated task to " + JSON.stringify(updatedTask));
        }, (err) => {
            console.error(err);
        });
    }
>>>>>>> Stashed changes
}
