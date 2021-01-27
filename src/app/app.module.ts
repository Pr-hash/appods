import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { OdsModule } from './Modules/ods/ods.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { SharedModule } from './Shared/shared.module';
import { BloqueadorUIComponent } from './Shared/block-ui/BloqueadorUIComponent';
import { BlockUIModule } from 'ng-block-ui';
@NgModule({
  declarations: [
    AppComponent,
    BloqueadorUIComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    OdsModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    SharedModule,
    BlockUIModule.forRoot({
      template: BloqueadorUIComponent
    }),
  ],
  providers: [],
  entryComponents: [
    BloqueadorUIComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
