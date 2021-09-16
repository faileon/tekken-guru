import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {RoutingModule} from './modules/routing/routing.module';
import {FaConfig, FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {
  faBars,
  faStar as fasStar,
  faTimes,
  faFilter,
  faSearch,
  faSyncAlt,
  faFilm,
  faVideo,
  faChevronRight,
  faChevronDown,
  faExpand,
  faPlay,
  faPause,
  faTachometerAlt,
  faSpinner,
  faGamepad,
  faCircle,
  faCheckCircle,
  faCog,
  faWrench,
  faUserCog,
  faVolumeMute, faVolumeUp, faColumns, faSync,
  faDatabase
} from '@fortawesome/free-solid-svg-icons';
import {faStar as farStar} from '@fortawesome/free-regular-svg-icons';
import {ScreenModule} from './screens/screen.module';
import {ComponentModule} from './components/component.module';
import {AngularFireAnalyticsModule, ScreenTrackingService} from '@angular/fire/analytics';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAnalyticsModule,
    AngularFirestoreModule.enablePersistence(),
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    BrowserAnimationsModule,
    RoutingModule,
    FlexLayoutModule,
    ScreenModule,
    ComponentModule,
    FontAwesomeModule
  ],
  providers: [
    ScreenTrackingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(iconLibrary: FaIconLibrary, faConfig: FaConfig) {
    // create icon library to use in app
    iconLibrary.addIcons(
      faBars,
      faTimes,
      fasStar,
      farStar,
      faFilter,
      faSearch,
      faSyncAlt,
      faVideo,
      faFilm,
      faChevronRight,
      faChevronDown,
      faExpand,
      faPlay,
      faPause,
      faTachometerAlt,
      faSpinner,
      faGamepad,
      faCog,
      faCircle,
      faCheckCircle,
      faWrench,
      faUserCog,
      faVolumeMute,
      faVolumeUp,
      faColumns,
      faSync,
      faDatabase
    );
    faConfig.fixedWidth = true;
  }
}
