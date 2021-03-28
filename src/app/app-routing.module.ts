import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AngularFireAnalyticsModule, ScreenTrackingService} from '@angular/fire/analytics';

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AngularFireAnalyticsModule
  ],
  exports: [RouterModule],
  providers: [
    ScreenTrackingService
  ]
})
export class AppRoutingModule { }
