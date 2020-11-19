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
import {  HttpClientModule } from '@angular/common/http';
import { RasporedNastaveComponent } from './raspored-nastave/raspored-nastave.component';
import { FooterComponent } from './footer/footer.component';
import { dataReducer } from './reducers/dataReducer';

const routes: Routes = [
  {path: 'oglas/:yearId/:oglasId', component: OglasiComponent},
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
      settings: settingsReducer,
      data : dataReducer
    }),
    CommonModule,
    NgbModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
