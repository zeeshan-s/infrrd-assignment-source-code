import { LoadingSpinnerService, SpinnerState } from './loading-spinner.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss']
})
export class LoadingSpinnerComponent implements OnInit {
  public visible: any = false;
  public selectedTheme: any;
   private spinnerStateChanged: Subscription;

   constructor(
     private spinnerService: LoadingSpinnerService
   ) { }

   ngOnInit() {
     this.spinnerStateChanged = this.spinnerService.spinnerState
       .subscribe((state: SpinnerState) => {
         this.visible = state.show;
       });
   }
   ngOnDestroy() {
     this.spinnerStateChanged.unsubscribe();
   }

}
