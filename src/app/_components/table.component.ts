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
    projectExists: boolean;

    // DataSource and Column names for table
    dsTasks: MatTableDataSource<Task>;
    dcTasks: string[] = ["assignedTo", "description", "status", "edit"];

    // UI Variables
    selectedTask: Task;
    currentDescription: string;
    currentStatus: string;
    currentAssignment: User;

    // Flags that control the expansion panel
    f_firstPanel = false;
    f_secondPanel = false;

    constructor(private auth: AuthenticationService, private router: Router) {
        this.dsTasks = new MatTableDataSource<Task>();
        this.tasks = new Array();
        this.projectList = new Array();
        this.projectExists = true;
    }

    ngOnInit() {
        // projectList needs to come from the api; this will be all the projects the user has access to
        this.auth.projects(localStorage.getItem('user')).subscribe(projects => {
            if (projects.length == 0) {
                this.currentProject = {
                    _id: '0',
                    name: "No Project Selected"
                };
                this.projectSelection = this.currentProject;
            } else {
                this.projectExists = false;
                for (let project of projects) {
                    this.projectList.push(new Project(project));
                }
                this.currentProject = this.projectList[0];
                this.projectSelection = this.currentProject;
                localStorage.setItem('project', this.currentProject._id)

                this.auth.tasks(this.currentProject._id).subscribe(taskArray => {
                    for (let taskItem of taskArray) {
                        this.tasks.push(new Task(taskItem));
                    }
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
        // Immediately add this task to the table for viewing
        var nt = new Task({
            _id: "null",
            assignedTo: {
                _id: localStorage.getItem('user'),
                name: localStorage.getItem('name')
            },
            description: "none",
            status: "To-Do",
            reviewedBy: {
                _id: localStorage.getItem('user'),
                name: localStorage.getItem('name')
            },
            // this.dueDate = td.dueDate.toString();
            rating: "none",
        });

        this.tasks.unshift(nt);
        this.selectedTask = nt;
        this.currentDescription = nt.description;

        // Add a task to the Project tasks via api
        this.auth.postTask(new ProjectPackage(this.currentProject, localStorage.getItem('user'))).subscribe(task => {
            this.selectedTask._id = task._id;
            this.selectedTask.assignedTo = task.assignedTo;
        }, (err) =>  {
            console.error(err);
        });

        this.f_firstPanel = false;
        this.f_secondPanel = true;

        // Somehow go to edit task for this task
    }
    editTask(task: Task) {
        this.selectedTask = JSON.parse(JSON.stringify(task));
        this.currentAssignment = task.assignedTo;
        this.currentDescription = task.description;
        this.currentStatus = task.status;
        this.f_firstPanel = false;
        this.f_secondPanel = true;
    }

    cancelEdit() {
        this.f_firstPanel = true;
        this.f_secondPanel = false;
        this.selectedTask = null;
    }

    finishEdit() {
        // this.selectedTask.assignedTo = this.currentAssignment;
        this.selectedTask.status = this.currentStatus;
        this.selectedTask.description = this.currentDescription;

        this.updateTask();

        this.f_firstPanel = true;
        this.f_secondPanel = false;
        const index = this.findIndexofTask();
        this.tasks[index] = this.selectedTask;
    }

    findIndexofTask(): number {
      const index = this.tasks.
        findIndex(t => t._id === this.selectedTask._id);
      return index;
    }

    updateTableTasks() {
        this.dsTasks.data = this.tasks;
        for (let task of this.dsTasks.data) {
            var param;
            if (typeof task.assignedTo != 'string') {
                param = task.assignedTo._id;
            } else {
                param = task.assignedTo;
            }
            this.auth.getUser(param).subscribe(user => {
                task.assignedTo = user
            });
        }
    }

    pullTasks() {
        this.tasks = new Array();
        this.updateTableTasks();
        this.auth.tasks(this.currentProject._id).subscribe(taskArray => {
            for (let taskItem of taskArray) {
                this.tasks.push(new Task(taskItem));
            }
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
        this.currentProject = selection;
        localStorage.setItem('project', this.currentProject._id)
        this.pullTasks();
        this.f_firstPanel = true;
    }

    updateTask() {
        this.auth.patchTask(this.selectedTask).subscribe(updatedTask => {
            this.updateTableTasks();
        }, (err) => {
            console.error(err);
        });
    }
}
