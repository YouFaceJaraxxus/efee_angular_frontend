import { OglasComponent } from './oglas/oglas.component';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { settingsReducer } from './reducers/settingsReducer';
import { OglasiComponent } from './oglasi/oglasi.component';
import { ZavrsniRadoviComponent } from './zavrsni-radovi/zavrsni-radovi.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {  HttpClientModule } from '@angular/common/http';
import { RasporedNastaveComponent } from './raspored-nastave/raspored-nastave.component';
import { FooterComponent } from './footer/footer.component';

const routes: Routes = [
  {path: 'oglas/:yearId/:oglasId', component: OglasComponent},
  {path: 'oglasi/:yearId', component: OglasiComponent},
  {path: 'zavrsni-radovi/:typeId', component: ZavrsniRadoviComponent},
  {path: 'pocetna', component: HomePageComponent},
  {path: 'raspored-nastave', component: RasporedNastaveComponent},
  {path: '**', component: HomePageComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    OglasiComponent,
    ZavrsniRadoviComponent,
    NavbarComponent,
    OglasComponent,
    RasporedNastaveComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot({
      settings: settingsReducer
    }),
    CommonModule,
    NgbModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
