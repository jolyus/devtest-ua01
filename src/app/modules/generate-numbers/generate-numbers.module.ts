import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GenerateNumbersRoutingModule } from './generate-numbers-routing.module';
import { GeneratedNumbersTableComponent } from './generated-numbers-table/generated-numbers-table.component';
import { GeneratedNumbersLineGraphComponent } from './generated-numbers-line-graph/generated-numbers-line-graph.component';
import { GenerateNumberPopupComponent } from './generate-number-popup/generate-number-popup.component';
import { GenerateNumbersComponent } from './generate-numbers.component';
import { MaterialModule } from 'src/app/material.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';


@NgModule({
  declarations: [
    GenerateNumbersComponent,
    GeneratedNumbersTableComponent,
    GeneratedNumbersLineGraphComponent,
    GenerateNumberPopupComponent,
  ],
  imports: [
    CommonModule,
    GenerateNumbersRoutingModule,
    MaterialModule,
    NgxChartsModule
  ]
})
export class GenerateNumbersModule { }
