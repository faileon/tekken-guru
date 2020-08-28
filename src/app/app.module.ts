import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {InputNotationComponent} from './components/input-notation/input-notation.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import {CharacterGridComponent} from './components/character-grid/character-grid.component';
import {CharacterSelectComponent} from './screens/character-select/character-select.component';
import { DashboardComponent } from './screens/dashboard/dashboard.component';
import { ButtonComponent } from './components/ui/button/button.component';


@NgModule({
  declarations: [
    AppComponent,
    // components
    InputNotationComponent,
    CharacterGridComponent,
    // screens
    CharacterSelectComponent,
    DashboardComponent,
    ButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    BrowserAnimationsModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
