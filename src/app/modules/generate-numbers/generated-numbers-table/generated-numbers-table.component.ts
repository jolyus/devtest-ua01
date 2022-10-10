import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { tap } from 'rxjs';

export interface TableColumn {
  columnDef: string;
  header: string
}

@Component({
  selector: 'app-generated-numbers-table',
  templateUrl: './generated-numbers-table.component.html',
  styleUrls: ['./generated-numbers-table.component.scss']
})
export class GeneratedNumbersTableComponent implements OnInit, OnChanges, AfterViewInit {
  @ViewChild(MatPaginator, { static: true }) paginator?: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort?: MatSort;

  @Input() dataset: Array<any> = [];
  @Input() columns: Array<TableColumn> = [];
  @Input() totalRows: number = 0;
  @Input() nextLink: string = '';
  @Input() prevLink: string = '';
  @Input() isLoading: boolean = false;

  @Output() paginationAction = new EventEmitter();

  public dataSource?: MatTableDataSource<any>;
  public displayedColumns: Array<string> = [];


  constructor() { }

  ngOnInit(): void {
    this.displayedColumns = this.displayedColumns.concat(this.columns.map(x => x.columnDef));    // pre-fix static

    this.dataSource = new MatTableDataSource<any>(this.dataset);

    // set pagination
    this.dataSource.paginator = this.paginator!;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes['dataset']) {
      if (changes['dataset'].currentValue) {
        this.dataSource = new MatTableDataSource<any>([...changes['dataset'].currentValue]);
      }
    }
  }

  ngAfterViewInit() {
    this.dataSource!.sort = this.sort!;
    this.paginator!.page
      .pipe(
        tap((event) => {
          console.log((event.previousPageIndex! > event.pageIndex) ? 'prev' : 'next')
          this.paginationAction.emit((event.previousPageIndex! > event.pageIndex) ? 'prev' : 'next')
        })
      )
      .subscribe();
  }

}
