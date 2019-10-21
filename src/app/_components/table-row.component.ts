import { Component, OnInit, Input } from '@angular/core';
import { TaskDetails } from '../_services';

@Component({
  selector: 'app-table-row',
  templateUrl: './table-row.component.html'
})

export class TableRowComponent {
  @Input() task: TaskDetails;
  @Input() columns: string[];

  constructor() { }
  ngOnInit() {}
}
