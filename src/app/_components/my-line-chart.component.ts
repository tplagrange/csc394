import { Component, OnInit,ElementRef, ViewChild, AfterContentInit, AfterViewInit, APP_ID } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType, ChartData } from 'chart.js';
import { ChartsModule, BaseChartDirective } from 'ng2-charts';
import { MatTableDataSource, MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthenticationService, TaskDetails } from '../_services';
import { Task } from '../_classes';
import { NgChartjsModule, NgChartjsDirective } from 'ng-chartjs';

//import { Chart } from 'chart.js';


@Component({
    selector: 'app-my-line-chart',
    templateUrl: './my-line-chart.component.html',
    styleUrls: ['./my-line-chart.component.css']
})

export class MyLineChartComponent implements OnInit {

    //@ViewChild('Chart', { static: false }) public Chart: BaseChartDirective;
    //public context: CanvasRenderingContext2D;
    graphTasks: number[];
    tasks: Task[];



    lineChartData: Array<any> = [
        {
            label: "Complete",
            backgroundColor: "black",
            fill: false,
            lineTension: 0.1,
            //backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [5, 3, 2]
        },
        {
            label: "In-Progress",
            backgroundColor: "lightslategray",
            fill: false,
            lineTension: 0.1,
            //backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [3, 1, 4]
        },
        {
            label: "Blocked",
            backgroundColor: "maroon",
            fill: false,
            lineTension: 0.1,
            //backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [2, 4, 4]
        },
        {
            label: "In-Queue",
            backgroundColor: "burlywood",
            fill: false,
            lineTension: 0.1,
            //backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [7, 2, 9]
        }
    ];
             //this is a number[] and should be the number of tasks created, marked complete, and pending
             //we can do this based on the overall course of the project
              //[0]: complete \\ [1]: in progress  \\ [2]: blocked \\ [3]: in queue
            //labels: ['Bill', 'Bob', 'Todd'],
            

    addData(thing: Task[]) {///Didn't have the time to test really, but I think you will want to go through the array of Tasks and for each task you will push parts of its data into the
                            /// logical data location. EX: lineChartData[0] == complete tasks so you would push this.auth.Task.completed for [0] then task.in-progress to [1]
        for (var x = 0; x < thing.length; x++) {
            this.lineChartData[0]["data"].push(thing[x]._id);
            this.lineChartData[1]
            this.lineChartData[2]
            this.lineChartData[3]
            }
    };


    lineChartLabels: Array<any> = ['Bill', 'Bob', 'Todd']; //, 'Robert', 'Roger', 'Bobert', 'Phillipe'];
    lineChartOptions: any = {
        responsive: true,
        horizontalLine: [{
            y: 82,
            style: 'rgba(255, 0, 0, .4)',
            text: 'max'
        }, {
            y: 60,
            style: '#00ffff',
        }, {
            y: 44,
            text: 'min'
        }]
    };
    lineChartGlobalPlugin = {
        responsive: true,
        annotation: {
            annotations: [
                {
                    drawTime: 'afterDraw',
                    type: 'line',
                    mode: 'horizontal',
                    scaleID: 'y-axis-0',
                    value: 70,
                    borderColor: '#000000',
                    borderWidth: 2,
                    label: {
                        backgroundColor: 'red',
                        content: 'Target line',
                        enabled: true,
                        position: 'center',
                    }
                }
            ]
        }
    };

    public pieChartLabels: string[] = ['Complete', 'In-Progress', 'Blocked', 'In-Queue'];
    public pieChartData: number[] = [5, 3, 2, 9]; //user-specific task data goes here
    public pieChartType = 'pie';

    pieColors = [
        {
            'backgroundColor': [
                'black',
                'lightslategray',
                'maroon',
                'burlywood'
            ],
            'borderColor': [
                '#fff',
                '#fff',
                '#fff',
            ],
            'pointBackgroundColor': [
                'black',
                'lightslategray',
                'maroon',
                'burlywood'
            ],
            'pointBorderColor': [
                '#fff',
                '#fff',
                '#fff'
            ],
            'pointHoverBackgroundColor': [
                'black',
                'lightslategray',
                'maroon',
                'burlywood'
            ],
            'pointHoverBorderColor': [
                'black',
                'lightslategray',
                'maroon',
                'burlywood'
            ]
        }
    ];

    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }

    public lineChartLegend = true;
    public lineChartType = 'bar';
    dsTasks: MatTableDataSource<Task>;
    //dsTasks: any;


    constructor(private auth: AuthenticationService) {
        this.dsTasks = new MatTableDataSource<Task>();
        this.tasks = new Array();
    }


    ngOnInit() {
        //this.auth.tasks().subscribe(taskArray => {
        //    // console.log("Returning tasks")
        //    for (let taskItem of taskArray) {
        //        this.tasks.push(new Task(taskItem));
        //    }
        //    this.updateGraphTasks();
        //}, (err) => {
        //    console.error(err);
        //});
    }
    updateGraphTasks() {
        //console.log(this.lineChartData[0].indexOf("data"));
        //this.lineChartLabels = [...this.lineChartLabels];
        //this.lineChartData[16] = this.tasks.map(x => x._id).slice(0,4);
        //console.log(this.lineChartData["data"].map((x: any) => x));
        //console.log(this.tasks.map(x => x._id));
    }
}


    
