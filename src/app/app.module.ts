import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {InputNotationComponent} from './components/input-notation/input-notation.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import {CharacterGridComponent} from './components/character/select/grid/character-grid.component';
import {CharacterSelectScreenComponent} from './screens/character/select/character-select-screen.component';
import {DashboardScreenComponent} from './screens/dashboard/dashboard-screen.component';
import {ButtonComponent} from './components/ui/button/button.component';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {RoutingModule} from './modules/routing/routing.module';
import { CharacterDetailScreenComponentComponent } from './screens/character/detail/character-detail-screen-component.component';
import { CharacterHeaderComponent } from './components/character/detail/character-header/character-header.component';


@NgModule({
  declarations: [
    AppComponent,
    // components
    InputNotationComponent,
    CharacterGridComponent,
    // screens
    CharacterSelectScreenComponent,
    DashboardScreenComponent,
    ButtonComponent,
    CharacterDetailScreenComponentComponent,
    CharacterHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    BrowserAnimationsModule,
    RoutingModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
