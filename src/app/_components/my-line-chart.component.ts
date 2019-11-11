import { Component, OnInit,ElementRef, ViewChild, AfterContentInit, AfterViewInit, APP_ID } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType, ChartData } from 'chart.js';

import { MatTableDataSource, MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthenticationService, TaskDetails } from '../_services';
import { Task } from '../_classes';
import { Chart } from 'chart.js';


@Component({
    selector: 'app-my-line-chart',
    templateUrl: './my-line-chart.component.html',
    styleUrls: ['./my-line-chart.component.css']
})
export class MyLineChartComponent implements OnInit, AfterViewInit {

    //@ViewChild('MyCanvas', {static:false}) MyCanvas: any;
    //public context: CanvasRenderingContext2D;


    @ViewChild('canvas', { static: false }) public canvas: ElementRef<any>;
    public context: CanvasRenderingContext2D;
    chart: any;

    constructor(private auth: AuthenticationService) {
        this.dsTasks = new MatTableDataSource<Task>();
        this.tasks = new Array();
    }

    //private auth: AuthenticationService;
   //tasks:JSON
    //chart:any;
    dsTasks: MatTableDataSource<Task>;
    //chart = Chart;
    labels: [];
    //constructor() { }
    tasks: Task[];
    graphData: number[];

   //JSON.parse(JSON.stringify(this.tasks))
    
    ngOnInit() {
        this.auth.tasks().subscribe(taskArray => {
            // console.log("Returning tasks")
            for (let taskItem of taskArray) {
                this.tasks.push(new Task(taskItem));
                
            }
            this.updateGraphTasks();
        }, (err) => {
            console.error(err);
        });
    }
    ngAfterViewInit() {
        //var ctx = document.getElementById("#chart").
        this.context = (<HTMLCanvasElement>this.canvas.nativeElement).getContext('2d');
        //  .getContext("2d");
        this.chart = new Chart(this.canvas.nativeElement,
            {
                type: 'line',
                data: {
                    labels: this.labels,
                    datasets: [
                        {
                            label: "tasks",
                            data: this.tasks.map(x => x._id),
                            borderColor: '#3cba9f',
                            fill: false
                        }
                    ]
                }
            }

        );
        console.log(this.graphData);
        console.log(this.tasks);
    }
    updateGraphTasks() {
        this.dsTasks.data = this.tasks;
        
        //this.graphData = this.dsTasks.data.entries();
        
    }
}
    


    //chartit() {
    //    let htmlref = 
    //    this.myChart = new Chart(htmlref, {
    //        data: {
    //            datasets: [{
    //                data: [10, 20, 30]
    //            }],

    //            // These labels appear in the legend and in the tooltips when hovering different arcs
    //            labels: [
    //                'Red',
    //                'Yellow',
    //                'Blue'
    //            ]

    //        }
    //    });
    //}
//}

    // DataSource and Column names for table
    //dsTasks: MatTableDataSource<Task>;
//    dcTasks: string[] = ["assignedTo", "description", "status", "reviewedBy", "dueDate", "rating", "edit"];

//    // UI Variables
//    selectedTask: Task;
//    currentDescription: string;

//    // Flags that control the expansion panel
//    f_firstPanel = false;
//    f_secondPanel = false;

//    constructor(private auth: AuthenticationService) {
//        this.dsTasks = new MatTableDataSource<Task>();
//        this.tasks = new Array();
//    }
    
    

//    public lineChartData: ChartDataSets[] = [
//        { data: , label: 'Series A' },
//    ];

//    public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
//    public lineChartOptions: ChartOptions = {
//    responsive: true,
//    };
//    public lineChartColors: Color[] = [
//    {
//        borderColor: 'black',
//        backgroundColor: 'rgba(255,0,0,0.3)',
//    },
//    ];
//    public lineChartLegend = true;
//    public lineChartType: ChartType = 'line';
//    public lineChartPlugins = [];


//    //public ngOnInit() {
//    //    this.auth.tasks().subscribe(taskArray => {
//    //        // console.log("Returning tasks")
//    //        for (let taskItem of taskArray) {
//    //            this.tasks.push(new Task(taskItem));
//    //        }
//    //        this.updateTableTasks();

//    //    }, (err) => {
//    //        console.error(err);
//    //    });

//    //    this.f_firstPanel = true;
//    //    this.updateTableTasks();
//    //}

//    editTask(task: Task) {
//        // this.selectedTask = trainer;
//        this.selectedTask = JSON.parse(JSON.stringify(task));
//        this.currentDescription = task.description;
//        this.f_firstPanel = false;
//        this.f_secondPanel = true;
//    }

//    cancelEdit() {
//        this.f_firstPanel = true;
//        this.f_secondPanel = false;
//        this.selectedTask = null;
//    }

//    finishEdit() {
//        this.f_firstPanel = true;
//        this.f_secondPanel = false;
//        const index = this.findIndexofTask();
//        this.tasks[index] = this.selectedTask;
//        this.updateTableTasks();
//        this.selectedTask = null;
//    }

//    findIndexofTask(): number {
//      const index = this.tasks.
//        findIndex(t => t._id === this.selectedTask._id);
//      return index;
//    }

//    updateTableTasks() {
//        this.dsTasks.data = this.tasks;
//        //this.lineChartData.push({ data: Array(Number(this.tasks)), label: 'Series A' });
   
//        //console.log(this.dsTasks);
//        //console.log(this.dsTasks.data);
//    }

//    setDescription() {
//        this.selectedTask.description = this.currentDescription;
//        this.auth.setTaskDescription(this.selectedTask).subscribe(updatedTask => {
//            console.log("Updated task to " + JSON.stringify(updatedTask));
//        }, (err) => {
//            console.error(err);
//        });
//}
//}


    
