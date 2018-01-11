import { DataFormComponent } from './data-form.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    DataFormComponent
  ]
})
export class DataFormModule { }
