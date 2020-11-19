
import { OglasiService } from './../services/oglasi.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { constants, util, adSample } from '../config';
import { setData, setFetched } from '../actions/dataActions';

@Component({
  selector: 'app-oglasi',
  templateUrl: './oglasi.component.html',
  styleUrls: ['./oglasi.component.css']
})
export class OglasiComponent implements OnInit {
  settings$: Observable<{ color: string, language: string }>;
  data$: Observable<any[]>;
  yearId: number;
  globalAnnouncements = null;
  announcements = null;
  yearTitle: string;
  color: string;
  language: string;
  fetched = false;
  oglasId : number;
  single: boolean;
  constructor(private settingsStore: Store<{ settings: { color: string, language: string } }>, private dataStore: Store<{ data: any[] }>, private route: ActivatedRoute, private oglasiService: OglasiService) {
    this.settings$ = settingsStore.select('settings');
    this.settings$.subscribe(settings => {
      this.color = settings.color;
      this.language = settings.language;
    });
    this.data$ = dataStore.select('data');
    this.data$.subscribe(data => {
      this.globalAnnouncements = (data as any).data;
    });
    //this.announcements= [adSample];
  }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.yearId = (params as any).get('yearId');
      this.yearTitle = util.getYearTitle(this.yearId);
      // tslint:disable-next-line: forin
      for (const i in this.globalAnnouncements){
        let an = this.globalAnnouncements[i];
        //console.log('single global', an)
        //console.log('this.yearId', this.yearId);
        if (an.yearId == this.yearId){
          this.announcements = an.data;
          //console.log('found the right announcements', an)
          if (an != null && an.data!=null && an.data.length < 1){
            console.log('fetching', this.yearId);
            const announcementList = this.oglasiService.getAllFromMultiple(constants.yearIds);
            const reduxArray = new Array();
            let itemsProcessed = 0;
            announcementList.forEach((item, index, array) => {
              item.subscribe(result => {
                //console.log('result', result)
                itemsProcessed++;
                reduxArray.push({yearId: constants.yearIds[index], data: result});
                if (this.yearId == constants.yearIds[index]){
                  //console.log('found the goods while fetching', result)
                  this.announcements = result;
                }
                if (itemsProcessed == array.length) {
                  this.fetched=true;
                  this.dataStore.dispatch(setFetched({newFetched:true}));
                  this.dataStore.dispatch(setData({newData: reduxArray})); 
                }
              });
            });
          }
          break;
        }
      }
      //console.log('finally', this.announcements)
      this.oglasId = (params as any).get('oglasId');
      if(this.oglasId!=null){
        this.single = true;
      }
      else this.single = false;
      console.log(this.single)
    });
  }

  dataEmpty = () => {
    return this.announcements == null || this.announcements.length < 1;
  }

  resolveBackground = () => {
    return `background-${this.color}`;
  }
}
