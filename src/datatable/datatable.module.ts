import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatatableComponent } from './datatable.component';
import { PagerService } from './datatable.service';

@NgModule({
    imports:[
        CommonModule
    ],
    declarations:[
        DatatableComponent
    ],
    providers:[
        PagerService
    ],
    exports:[
        DatatableComponent
    ]
})
export class DatatableModule{
    static forRoot(): ModuleWithProviders {
        return {
          ngModule: DatatableModule
        }
      }
}