import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatIconRegistry  } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthenticationService, TaskDetails, ProjectDetails, ProjectPackage } from '../_services';
import { Task, Project, User } from '../_classes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent {

    // API Returned Variables
    tasks: Task[]

    // Keep track of the project
    projectList: Project[];
    currentProject: Project;
    projectSelection: Project;

    // DataSource and Column names for table
    dsTasks: MatTableDataSource<Task>;
    dcTasks: string[] = ["assignedTo", "description", "status", "edit"];

    // UI Variables
    selectedTask: Task;
    currentDescription: string;

    // Flags that control the expansion panel
    f_firstPanel = false;
    f_secondPanel = false;

    constructor(private auth: AuthenticationService, private router: Router) {
        this.dsTasks = new MatTableDataSource<Task>();
        this.tasks = new Array();
        this.projectList = new Array();
    }

    ngOnInit() {
        // projectList needs to come from the api; this will be all the projects the user has access to
        this.auth.projects(localStorage.getItem('user')).subscribe(projects => {
            if (projects.length == 0) {
                console.log("Baking projects");
                this.currentProject = {
                    _id: '0',
                    name: "No Project Selected"
                };
                this.projectSelection = this.currentProject;
            } else {
                for (let project of projects) {
                    this.projectList.push(new Project(project));
                }
                this.currentProject = this.projectList[0];
                this.projectSelection = this.currentProject;

                this.auth.tasks(this.currentProject._id).subscribe(taskArray => {
                    for (let taskItem of taskArray) {
                        this.tasks.push(new Task(taskItem));
                    }
                    console.log(this.tasks);
                    this.updateTableTasks();
                }, (err) => {
                    console.error(err);
                });

                this.f_firstPanel = true;
                this.updateTableTasks();
            }
        });


    }

    // Paginator Settings
    @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
    ngAfterViewInit() {
        this.dsTasks.paginator = this.paginator;
    }

    addTask() {
        // Add a task to the Project tasks via api
        this.auth.postTask(new ProjectPackage(this.currentProject, localStorage.getItem('user'))).subscribe(task => {
            // this.tasks.unshift(task);
            this.updateTableTasks();
        }, (err) =>  {
            console.error(err);
        });
        // Somehow go to edit task for this task
    }
    editTask(task: Task) {
        this.selectedTask = JSON.parse(JSON.stringify(task));
        this.currentDescription = task.description;
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

    pullTasks() {
        this.tasks = new Array();
        this.updateTableTasks();
        this.auth.tasks(this.currentProject._id).subscribe(taskArray => {
            for (let taskItem of taskArray) {
                this.tasks.push(new Task(taskItem));
            }
            console.log(this.tasks);
            this.updateTableTasks();
        }, (err) => {
            console.error(err);
        });

        this.f_firstPanel = true;
        this.updateTableTasks();
    }

    createProject() {
        // Redirect to the project creation page
        this.router.navigateByUrl('/project');
    }

    updateSelection(selection: Project) {
        console.log("You chose " + selection.name);
        this.currentProject = selection;
        this.pullTasks();
        this.f_firstPanel = true;
    }

    setDescription() {
        console.log("Setting Description")
        this.selectedTask.description = this.currentDescription;
        this.auth.setTaskDescription(this.selectedTask).subscribe(updatedTask => {
            console.log("Updated task to " + JSON.stringify(updatedTask));
        }, (err) => {
            console.error(err);
        });
    }
}
