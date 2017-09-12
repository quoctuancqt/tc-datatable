import { Component, OnInit, Input, Output, EventEmitter, ContentChild, TemplateRef } from '@angular/core';
import { PagerService } from './datatable.service';

@Component({
  selector: 'tc-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss']
})
export class DatatableComponent implements OnInit {
  @Input() columns: Array<ColumnDef> = new Array<ColumnDef>();

  @Input() gridOptions: GridOptions = new GridOptions();

  @Output() callback = new EventEmitter();

  @ContentChild(TemplateRef) rowTempl;

  public pager: any = {};

  private pageSize: number;

  constructor(private pagerService: PagerService) { }

  ngOnInit(): void {
  }

  setPage(page: number,pageSize: number = 10): void {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    this.pager = this.pagerService.getPager(this.gridOptions.totalItems, page, pageSize);

    this.pageSize = this.pager.pageSize;
  }

  progressPaging(page) {
    this.callback.emit(page);
  }

  refeshPager(): void {
    this.pager.totalPages = Math.ceil(this.gridOptions.totalItems / this.pager.pageSize);
    if (this.pager.totalPages == 1) {
      this.pager.currentPage = 1;
    }
    else if (this.pager.totalPages == 0) {
      this.pager.currentPage = 1;
      this.pager.totalPages = undefined;
    }
    else {
      this.pager.currentPage = this.pager.totalPages;
    }
    this.setPage(this.pager.currentPage, this.pager.pageSize);
  }
}

export class DatatableConfigs {
  columns: Array<ColumnDef>;
  gridOptions: GridOptions

  constructor() {
    this.columns = new Array<ColumnDef>();
    this.gridOptions = new GridOptions();
  }
}

export class ColumnDef {
  caption: string;
  dataField: string;
  width?: string;
  display?: boolean;
  className?: string;

  constructor() {
    this.caption = "";
    this.dataField = "";
    this.width = "";
    this.display = true;
    this.className = "";
  }
}

export class GridOptions {
  data: Array<any>;
  totalItems?: number;
  paging?: boolean;
  pageSize?: number;

  constructor() {
    this.data = new Array<any>();
    this.totalItems = 0;
    this.paging = true;
    this.pageSize = 10;
  }
}