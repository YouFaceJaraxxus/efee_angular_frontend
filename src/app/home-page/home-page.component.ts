import { setFetched } from './../actions/dataActions';
import { OglasiService } from './../services/oglasi.service';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { toggleLanguage, toggleColor } from '../actions/settingsActions';
import {constants, util} from '../config';
import { setData } from '../actions/dataActions';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  settings$: Observable<{color: string, language: string}>;
  announcementList = [];
  announcementsMap = new Map();
  color: string;
  fetched = false;
  language: string;
  data$: Observable<any[]>;

  constructor(private settingsStore: Store<{ settings: {color: string, language: string} }>, private dataStore: Store<{data: any[]}>,  private oglasiService: OglasiService) {
    this.settings$ = settingsStore.select('settings');
    this.settings$.subscribe(settings => {
      this.color = settings.color;
      this.language = settings.language;
    });
    this.data$ = dataStore.select('data');
    this.data$.subscribe(data => {
      this.fetched = (data as any).fetched;
      this.announcementList = (data as any).data;
    });
    if (!this.fetched){
      this.announcementList = this.oglasiService.getAllFromMultiple(constants.yearIds);
      const reduxArray = new Array();
      let itemsProcessed = 0;
      this.announcementList.sort((a, b) => {
        return a.yearId - b.yearId;
      });
      this.announcementList.forEach((item, index, array) => {
        itemsProcessed++;
        item.subscribe(result => {
          this.announcementsMap.set(constants.yearIds[index], result);
          reduxArray.push({yearId: constants.yearIds[index], data: result});
          if (itemsProcessed == array.length) {
            this.fetched = true;
            this.dataStore.dispatch(setFetched({newFetched: true}));
            setTimeout(() => this.dataStore.dispatch(setData({newData: reduxArray})), 100); // add offset to ensure data is dispatched only after being fully fetched
          }
        });
      });
      }else{
        // console.log('else', this.announcementList)
        this.announcementList.forEach((item, index) => {
          this.announcementsMap.set(constants.yearIds[index], item.data);
        });
      }
  }


  listEmpty = () => {
    if (this.announcementList == null || this.announcementList.length < 1) { return true; }
    this.announcementList.forEach((value, key) => {
      if (value.data && value.data.length > 0) { return false; }
    });
    return true;
  }

  resolveTitle = (key) => {
    return util.transliterate(util.getYearTitle(key), this.language);
  }

  ngOnInit(){

  }

  resolveBackground = () => {
    return `background-${this.color}`;
  }

  resolveSectionTitleColor = () => {
    return `title-${this.color}`;
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

  getLink = (yearId, id) => {
    return constants.SHARE_ANNOUNCEMENT_LINK + yearId + '/' + id;
  }

  parseText = (text) => {
    return util.transliterate(text, this.language);
  }
}
