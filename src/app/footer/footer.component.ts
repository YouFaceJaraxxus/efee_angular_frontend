import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { toggleColor, toggleLanguage } from '../actions/settingsActions';
import { util } from '../config';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  getYear = new Date().getFullYear();
  settings$: Observable<{color: string, language: string}>;
  color: string;
  language: string;

  constructor(private settingsStore: Store<{ settings: {color: string, language: string} }>) {
    this.settings$ = settingsStore.select('settings');
    this.settings$.subscribe(settings => {
      this.color = settings.color;
      this.language = settings.language;
    });
  }

  ngOnInit(){

  }


  parseText = (text) =>{
    return util.transliterate(text, this.language);
  }

  toggleColor = (newColor) => {
    this.settingsStore.dispatch(toggleColor({color: newColor}));
  }

  toggleLanguage = (newLanguage) => {
    this.settingsStore.dispatch(toggleLanguage({language: newLanguage}));
  }


  log = (data) => {
    console.log(data);
  }

  resolveColor = () => {
    return `footer-${this.color}`;
  }

  resolveGear = () => {
    return `../../assets/gear_${this.color}.svg`;
  }

  onToggle = (toggleMenu, otherMenu) => {
    toggleMenu.classList.add('show');
    otherMenu.classList.remove('show');
  }

  onClose = (toggleMenu) => {
    toggleMenu.classList.remove('show');
  }

}
