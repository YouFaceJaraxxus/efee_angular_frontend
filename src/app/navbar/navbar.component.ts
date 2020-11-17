import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
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

  textColor = () =>{
    return 'text-' + this.color;
  }

  resolveHomeIcon = () =>{
    return `../../assets/home_${this.color}.svg`;
  }


  log = (data) => {
    console.log(data);
    console.log(this.color);
    console.log(this.language);
  }

  ngOnInit(): void {
  }

  resolveBanner = () =>{
    return `../../assets/header_banner_${this.color}.png`;
  }
}
