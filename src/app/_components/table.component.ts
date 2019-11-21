import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatIconRegistry  } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthenticationService, TaskDetails, ProjectDetails, ProjectPackage } from '../_services';
import { Task, Project, User } from '../_classes';

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

    constructor(private auth: AuthenticationService) {
        this.dsTasks = new MatTableDataSource<Task>();
        this.tasks = new Array();
    }

    ngOnInit() {
        // projectList needs to come from the api; this will be all the projects the user has access to
        console.log(localStorage.getItem('user'));

        this.auth.projects(localStorage.getItem('user')).subscribe(projects => {
            console.log("Projects loaded");
            for (let project of projects) {
                console.log(projects);
                this.projectList.push(new Project(project));
            }
        });

        if (true) {
            console.log("Baking projects");
            this.currentProject = {
                _id: '0',
                name: "No Project Selected"
            };
            this.projectSelection = this.currentProject;
        }

        this.auth.tasks().subscribe(taskArray => {
            // console.log("Returning tasks")
            for (let taskItem of taskArray) {
                this.tasks.push(new Task(taskItem));
                // console.log(taskItem);
            }
            this.updateTableTasks();
        }, (err) => {
            console.error(err);
        });

        this.f_firstPanel = true;
        this.updateTableTasks();
    }

    // Paginator Settings
    @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
    ngAfterViewInit() {
        this.dsTasks.paginator = this.paginator;
    }

    addTask() {
        console.log("Adding task");
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

    createProject() {
        console.log("Creating new project");

        // Dummy Variables for Now
        var project = new Project({
            _id: 'asdasd',
            name: 'My New Project'
        });

        this.auth.postProject(new ProjectPackage(project, localStorage.getItem('user'))).subscribe(proj => {

        }, (err) => {
            console.error(err);
        });
    }

    updateProjectSelection() {
        console.log("You chose " + this.projectSelection.name);
        this.currentProject = this.projectSelection;
    }

    setDescription() {
        this.selectedTask.description = this.currentDescription;
        this.auth.setTaskDescription(this.selectedTask).subscribe(updatedTask => {
            // console.log("Updated task to " + JSON.stringify(updatedTask));
        }, (err) => {
            console.error(err);
        });
    }
}
