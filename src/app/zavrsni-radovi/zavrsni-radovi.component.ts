import { ZavrsniRadService } from './../services/zavrsni-rad.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {util, constants} from '../config'
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-zavsni-radovi',
  templateUrl: './zavrsni-radovi.component.html',
  styleUrls: ['./zavrsni-radovi.component.css'],
  animations:[
    trigger('customFade', [
      transition('void => *', [
        style({opacity: 0}),
        animate('1s ease-out')
      ])
    ])
  ]
})
export class ZavrsniRadoviComponent implements OnInit {
  zavrsniRadovi : [];
  settings$: Observable<{ color: string, language: string }>;
  color: string;
  language: string;
  typeId: string;
  typeTitle: string;
  searchValue : any;
  searchParam = 'tema';
  includeSearch = false;
  offset = 0;
  single = false;
  total: number;

  zavrsniRadId: number;
  zavrsniRad: any;
  show = false;


  constructor(private settingsStore: Store<{ settings: { color: string, language: string } }>, private route: ActivatedRoute, private zavrsniRadService: ZavrsniRadService) {
    this.settings$ = settingsStore.select('settings');
    this.settings$.subscribe(settings => {
      this.color = settings.color;
      this.language = settings.language;
    });
   }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.searchValue = '';
      this.searchParam = 'tema';
      this.includeSearch = false;
      this.typeId = (params as any).get('typeId');
      this.typeTitle = util.getTypeIdTitle(this.typeId);
      this.zavrsniRadId = (params as any).get('zavrsniRadId');
      if (this.zavrsniRadId != null){
        this.single = true;
        this.getSingleData();
      }
      else { 
        this.single = false; 
        this.getData();
      }
      this.show = false;
      setTimeout(() => {
        this.show = true;
      }, 500);
    });
  }

  getData = () =>{
    this.zavrsniRadService.getZavrsniRadovi(this.typeId, this.offset, this.searchValue, this.includeSearch, this.searchParam).subscribe(result=>{
      this.zavrsniRadovi = (result as any).content;
      this.total = (result as any).total;
    })
  }

  getSingleData = () =>{
    this.zavrsniRadService.getSingleZavrsniRad(this.zavrsniRadId).subscribe(result=>{
      this.zavrsniRad = (result as any).content[0];
    })
  }

  resolveBackground = () => {
    return `background-${this.color}`;
  }

  paginate = (newOffset) => {
    this.offset = newOffset;
    newOffset = newOffset * constants.itemsPerPage;
    this.getData();
  }

  parseText = (text) => {
    return util.transliterate(text, this.language);
  }

  resolveFormStyle = () =>{
    return `zavrsni-radovi-form-${this.color}`;
  }

  handleSearchValueChange = ($event) => {
    this.searchValue = $event;
    if(this.searchValue=='') this.includeSearch = false;
    else this. includeSearch = true;
  }

  handleSelectChange = ($event) =>{
    this.searchParam = $event.target.value;
  }


  log = (data) =>{
    console.log(data);
  }
 
}
