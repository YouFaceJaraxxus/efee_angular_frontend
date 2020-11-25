import { trigger, animate, style, transition, state } from '@angular/animations';
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
  styleUrls: ['./oglasi.component.css'],
  animations: [
    trigger('customFade', [
      transition('void => *', [
        style({opacity: 0}),
        animate('1s ease-out')
      ])
    ])
  ]
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
  oglasId: number;
  single: boolean;
  singleData: any;
  currentAnnouncements: [];
  offset = 0;
  show = false;

  constructor(private settingsStore: Store<{ settings: { color: string, language: string } }>, private dataStore: Store<{ data: any[] }>, private route: ActivatedRoute, private oglasiService: OglasiService) {
    this.settings$ = settingsStore.select('settings');
    this.settings$.subscribe(settings => {
      this.color = settings.color;
      this.language = settings.language;
    });
    this.data$ = dataStore.select('data');
    this.data$.subscribe(data => {
      this.globalAnnouncements = (data as any).data;
      this.fetched = (data as any).fetched;
    });
    /*this.singleData = adSample;
    this.yearId = 1;*/
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.yearId = (params as any).get('yearId');
      this.yearTitle = util.getYearTitle(this.yearId);
      this.oglasId = (params as any).get('oglasId');
      if (this.oglasId != null){
        this.single = true;
      }
      else { this.single = false; }
      // tslint:disable-next-line: forin
      for (const i in this.globalAnnouncements){
        const an = this.globalAnnouncements[i];
        // console.log('single global', an)
        // console.log('this.yearId', this.yearId);
        if (an.yearId == this.yearId){
          this.announcements = [...an.data];
          this.currentAnnouncements = this.announcements.slice(this.offset, constants.itemsPerPage);
          // console.log('found the right announcements', an)
          if (!this.fetched){
            //console.log('fetching', this.yearId);
            const announcementList = this.oglasiService.getAllFromMultiple(constants.yearIds);
            const reduxArray = new Array();
            let itemsProcessed = 0;
            announcementList.forEach((item, index, array) => {
              item.subscribe(result => {
                // console.log('result', result)
                itemsProcessed++;
                reduxArray.push({yearId: constants.yearIds[index], data: result});
                if (this.yearId == constants.yearIds[index]){
                  // console.log('found the goods while fetching', result)
                  this.announcements = [...result];
                  this.currentAnnouncements = this.announcements.slice(this.offset, constants.itemsPerPage);
                }
                if (itemsProcessed == array.length) {
                  this.fetched = true;
                  this.dataStore.dispatch(setFetched({newFetched: true}));
                  this.dataStore.dispatch(setData({newData: reduxArray.sort((a, b) => {
                    return a.yearId - b.yearId;
                  })}));
                  this.singleData = this.findSingleAnnouncement();
                }
              });
            });
          }else{
            this.singleData = this.findSingleAnnouncement();
          }
          break;
        }
      }
      /*this.announcements = this.announcements.sort((a,b)=>{
        return b.id-a.id;
      })*/
      // console.log('sorted', this.announcements)
      // console.log('finally', this.announcements)

      // console.log(this.currentAnnouncements);
      this.show = false;
      setTimeout(() => {this.show = true; }, 500);
      this.paginate(0);
    });
  }

  resolveBackground = () => {
    return `background-${this.color}`;
  }

  findSingleAnnouncement = () => {
    if (this.oglasId != null) {return util.getItemById(this.announcements, this.oglasId); }
    else { return null; }
  }

  paginate = (newOffset) => {
    this.offset = newOffset;
    newOffset = newOffset * constants.itemsPerPage;
    this.currentAnnouncements = this.announcements.slice(newOffset, newOffset + constants.itemsPerPage);
  }
}
