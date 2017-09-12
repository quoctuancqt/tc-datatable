import { Component, ViewChild, OnInit } from '@angular/core';
import { DatatableConfigs, DatatableComponent, GridOptions } from '../datatable/datatable.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  configs = new DatatableConfigs();
  @ViewChild("grid") grid: DatatableComponent;
  dummyData: Array<any> = [
    { firstName: 'Tuan', lastName: 'Cao' },
    { firstName: 'Tony', lastName: 'Cao' }
  ];

  ngOnInit(): void {
    this.configs.columns = [
      { caption: 'First Name', dataField: 'firstName' },
      { caption: 'Last Name', dataField: 'lastName' },
      { caption: '', dataField: '' }
    ];
    this.configs.gridOptions = new GridOptions();
    this.configs.gridOptions.data = this.dummyData;
    this.configs.gridOptions.totalItems = this.dummyData.length;
    //remove setTimeout block if you get data from remote server
    setTimeout(()=>{
      this.grid.setPage(1, this.configs.gridOptions.pageSize);
    },500);
  }

  onPagerChange(page): void {
    console.log(page);
  }
}
