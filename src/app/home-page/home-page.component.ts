import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { toggleLanguage, toggleColor } from '../actions/settingsActions';
import {constants, util} from '../config';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  settings$: Observable<{color:string, language:string}>;
  color: string;
  language: string;
 
  constructor(private settingsStore: Store<{ settings: {color: string, language:string} }>) {
    this.settings$ = settingsStore.select('settings');
    this.settings$.subscribe(settings=>{
      this.color = settings.color;
      this.language = settings.language;
    })
  }

  ngOnInit(){

  }
 

  toggleColor = (newColor) => {
    this.settingsStore.dispatch(toggleColor({color: newColor}));
  }

  toggleLanguage = (newLanguage) => {
    this.settingsStore.dispatch(toggleLanguage({language:newLanguage}));
  }


  log = (data) => {
    console.log(data);
  }

}
