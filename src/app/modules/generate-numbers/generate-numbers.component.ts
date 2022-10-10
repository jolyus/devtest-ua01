import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { GenerateNumbersService } from 'src/app/services/generate-numbers.service';
import { GenerateNumberPopupComponent } from './generate-number-popup/generate-number-popup.component';

interface NumberResult {
  created: string;
  generator_user: string;
  updated: string;
  value: number;
}

@Component({
  selector: 'app-generate-numbers',
  templateUrl: './generate-numbers.component.html',
  styleUrls: ['./generate-numbers.component.scss']
})
export class GenerateNumbersComponent implements OnInit {

  public nextPath: string = '';
  public prevPath: string = '';
  public results: NumberResult[] = [];
  public generatedNumber?: number;
  public activeIndex = 0;
  public columns = [
    { columnDef: 'value', header: 'Number' },
  ];
  public totalRows: number = 0;

  public tableDataset = [];
  public isGeneratedNumbersLoading = false;

  public lineGraphData: number[] = [];

  constructor(
    public dialog: MatDialog,
    private generateNumbersService: GenerateNumbersService,
  ) {
  }

  ngOnInit(): void {
    this.loadGeneratedNumbers();
  }

  public onGenerateNewNumber() {
    this.generateNumbersService.generateNewNumber().subscribe({
      next: (response) => {
        this.generatedNumber = response?.value;
        this.totalRows += 1;
        if (this.generatedNumber) {
          let generatedNumberDialogRef = this.dialog.open(GenerateNumberPopupComponent, {
            data: { number: this.generatedNumber }
          });
          generatedNumberDialogRef.afterClosed().subscribe((result: any) => {
            if (this.activeIndex == 1) this.loadLineGraphData();
          });
        }
      },
      error: (e) => console.log(e)
    })
  }

  private loadGeneratedNumbers() {
    this.isGeneratedNumbersLoading = true;
    this.generateNumbersService.getGeneratedNumbers().subscribe((response) => {
      const next = response?.next?.split('/').slice(-1);
      const prev = response?.previous?.split('/').slice(-1);
      this.results = response?.results;
      this.totalRows = response?.count ?? 0;
      this.nextPath = next?.length ? next[0] : '';
      this.prevPath = prev?.length ? prev[0] : '';
      this.isGeneratedNumbersLoading = false;
    });
  }

  private onPagination(isNext: boolean) {
    this.isGeneratedNumbersLoading = true;
    this.generateNumbersService.getGeneratedNumbers(isNext ? this.nextPath : this.prevPath).subscribe((response) => {
      const next = response?.next?.split('/').slice(-1);
      const prev = response?.previous?.split('/').slice(-1);
      this.results = response?.results;
      this.totalRows = response?.count ?? 0;
      this.nextPath = next?.length ? next[0] : '';
      this.prevPath = prev?.length ? prev[0] : '';
      this.isGeneratedNumbersLoading = false;
    });
  }

  private loadLineGraphData() {
    this.isGeneratedNumbersLoading = true;
    const path = `?limit=20&offset=${this.totalRows - 20}`;
    this.generateNumbersService.getGeneratedNumbers(path).subscribe((response) => {
      if (response.count) {
        this.totalRows = response?.count;
      }
      this.lineGraphData = response?.results?.reverse().map((result: NumberResult) => result?.value);
      this.isGeneratedNumbersLoading = false;
    });
  }

  public onPaginationAction(action: string) {
    this.onPagination(action == 'next');
  }

  public onTabChange(event: MatTabChangeEvent) {
    if (event.index == 1) {
      this.activeIndex = event.index;
      this.loadLineGraphData();
    }
  }
}
