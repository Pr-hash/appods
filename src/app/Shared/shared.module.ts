import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaitingComponent } from './Components/waiting/waiting.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [WaitingComponent, NotFoundComponent],
  imports: [
    CommonModule,
    MatProgressBarModule
  ],
  exports:[
    WaitingComponent,
    NotFoundComponent
  ]
})
export class SharedModule { }
