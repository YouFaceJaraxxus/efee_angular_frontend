import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { util } from '../config';

@Component({
  selector: 'app-oglasi',
  templateUrl: './oglasi.component.html',
  styleUrls: ['./oglasi.component.css']
})
export class OglasiComponent implements OnInit {
  settings$: Observable<{ color: string, language: string }>;
  yearId: number;
  announcements: any[];
  yearTitle: string;
  color: string;
  language: string;
  constructor(private settingsStore: Store<{ settings: { color: string, language: string } }>, private route: ActivatedRoute, private httpClient: HttpClient) {
    this.settings$ = settingsStore.select('settings');
    this.settings$.subscribe(settings => {
      this.color = settings.color;
      this.language = settings.language;
    })
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.yearId = (params as any).get('yearId');
      console.log(this.yearId);
      this.yearTitle = util.getYearTitle(this.yearId);
      console.log(this.yearTitle);
      this.httpClient.get('https://efee.etf.unibl.org:8443/api/public/oglasne-ploce/' + this.yearId)
        .subscribe(result => {
          this.announcements = result as any[];
          console.log(this.announcements);
        })

    })
  }

  resolveBackground=()=>{
    return `background-${this.color}`;
  }
}
