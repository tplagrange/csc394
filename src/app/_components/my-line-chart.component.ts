import { Component, OnInit,ElementRef, ViewChild, AfterContentInit, AfterViewInit, APP_ID } from '@angular/core';
import { Chart, ChartDataSets, ChartOptions, ChartType, ChartData } from 'chart.js';
import { ChartsModule, BaseChartDirective } from 'ng2-charts';
import { MatTableDataSource, MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthenticationService, TaskDetails } from '../_services';
import { Task } from '../_classes';
import { NgChartjsModule, NgChartjsDirective } from 'ng-chartjs';

@Component({
    selector: 'app-my-line-chart',
    templateUrl: './my-line-chart.component.html',
    styleUrls: ['./my-line-chart.component.css']
})

export class MyLineChartComponent implements OnInit{

    //@ViewChild('Chart', { static: false }) public Chart: BaseChartDirective;
    //public context: CanvasRenderingContext2D;
    graphTasks: number[];
    tasks: Task[];


    lineChartData: Array<any> = [
        {
            label: 'My First dataset',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
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
            data: [10,20,30,40],
        }
    ];
    lineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
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




    public lineChartLegend = true;
    public lineChartType = 'bar';
    dsTasks: MatTableDataSource<Task>;
    //dsTasks: any;

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
}

    
