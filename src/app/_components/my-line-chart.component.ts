import { Input, Component, OnInit,ElementRef, ViewChild, AfterContentInit, AfterViewInit, APP_ID } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType, ChartData } from 'chart.js';
import { ChartsModule, BaseChartDirective } from 'ng2-charts';
import { MatTableDataSource, MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthenticationService, TaskDetails } from '../_services';
import { Task } from '../_classes';
import { NgChartjsModule, NgChartjsDirective } from 'ng-chartjs';
import { interval, Subscription } from 'rxjs';

@Component({
    selector: 'app-my-line-chart',
    templateUrl: './my-line-chart.component.html',
    styleUrls: ['./my-line-chart.component.css']
})

export class MyLineChartComponent implements OnInit {

    subscription: Subscription;
    intervalId: number;

    constructor(private auth: AuthenticationService) {
        this.lineChartLabels = new Array();
    }

    ngOnInit() {
        this.lineChartLabels.push("");
        this.pullData();
        // this.intervalId = setInterval(() => {this.pullData();}, 2000);
    }

    ngOnDestroy() {
        clearInterval(this.intervalId);
    }

    pullData() {
        // Project Data Logic
        // if (!localStorage.getItem('project')) {
        //     return;
        // } else {
        //     this.auth.tasks(localStorage.getItem('project')).subscribe(taskArray => {
        //         var copyLineChartData = this.lineChartData;
        //         for (let taskItem of taskArray) {
        //             if (taskItem.status == "To-Do") {
        //                 copyLineChartData[0].data[0]++;
        //             } else if (taskItem.status == "In Progress") {
        //                 copyLineChartData[1].data[0]++;
        //             } else {
        //                 copyLineChartData[2].data[0]++;
        //             }
        //         }
        //         this.lineChartData = copyLineChartData;
        //     });
        // }
        // this.auth.getUserMetrics(localStorage.getItem('user')).subscribe(user => {
        //     this.userToDo       = user.metrics.tasksOpened;
        //     this.userInProgress = user.metrics.tasksActive;
        //     this.userComplete   = user.metrics.tasksClosed;
        // });
    }

    @Input() public lineChartData: Array<any> = [
        {
            label: "To-Do",
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
            data: [ 0 ]
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
            data: [ 0 ]
        },
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
            data: [ 0 ]
        }
    ];

    lineChartLabels: Array<string>;

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

    pieChartLabels: string[] = ['To-Do', 'In Progress', 'Complete'];
    pieChartData: number[] = [5, 3, 2]; //user-specific task data goes here
    pieChartType = 'pie';

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
        return;
    }

    public chartHovered(e: any): void {
        return;
    }

    public lineChartLegend = true;
    public lineChartType = 'bar';
}
