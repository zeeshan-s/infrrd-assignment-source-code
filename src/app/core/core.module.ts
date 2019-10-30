import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header/header.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [HeaderComponent, LoadingSpinnerComponent],
  exports: [
    HeaderComponent,
    LoadingSpinnerComponent,
  ]
})
export class CoreModule { }
