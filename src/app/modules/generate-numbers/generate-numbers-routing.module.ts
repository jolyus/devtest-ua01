import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenerateNumbersComponent } from './generate-numbers.component';
import { GeneratedNumbersLineGraphComponent } from './generated-numbers-line-graph/generated-numbers-line-graph.component';
import { GeneratedNumbersTableComponent } from './generated-numbers-table/generated-numbers-table.component';

const routes: Routes = [
  {
    path: '',
    component: GenerateNumbersComponent,
    children: [],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GenerateNumbersRoutingModule { }
