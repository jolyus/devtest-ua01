import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-generated-numbers-line-graph',
  templateUrl: './generated-numbers-line-graph.component.html',
  styleUrls: ['./generated-numbers-line-graph.component.scss']
})
export class GeneratedNumbersLineGraphComponent implements OnChanges {

  @Input() dataset: number[] = [];

  public multi: any[] = [];
  public view: any[] = [700, 300];

  public showLabels: boolean = true;
  public animations: boolean = true;
  public xAxis: boolean = true;
  public yAxis: boolean = false;
  public showYAxisLabel: boolean = false;
  public showXAxisLabel: boolean = true;
  public xAxisLabel: string = 'Number';
  public timeline: boolean = true;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes['dataset']) {
      if (changes['dataset'].currentValue) {
        this.multi = [
          {
            name: 'Results',
            series: this.dataset.map(number => ({name: `${number}`, value: number}))
          }
        ];
      }
    }
  }
}
