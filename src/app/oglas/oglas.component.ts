import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import {util} from '../config'

@Component({
  selector: 'app-oglas',
  templateUrl: './oglas.component.html',
  styleUrls: ['./oglas.component.css'],
  animations:[
    trigger('expandCollapse',[
      state('collapsed', style({
        height:0,
        overflow:'hidden',
        padding: 0,
        margin: 0,
        opacity: 0
      })),

      transition('collapsed => expanded',[
        animate('0.5s ease-out', style({
          height:'*',
          overflow:'auto',
          padding:'0.5%'
        })),
        animate('1s ease-out', style({
           opacity: 1
        }))
      ]),

      transition('expanded => collapsed', [
        animate('0.6s ease-in', style({
          opacity: 0
        })),
        animate('0.3s ease-in')
      ])
    ])
  ]
})
export class OglasComponent implements OnInit {
  @Input('color') color: string;
  @Input('language') language: string;
  @Input('short') short: boolean;
  @Input('data') data: any;
  @Input('single') single : boolean;
  title : string;
  intro: string;
  content: string;
  date: string;
  author: string;
  open = false;

  constructor() {
   }

  ngOnInit(): void {
    this.title = this.data.naslov;
    this.intro = this.data.uvod;
    this.content = this.data.sadrzaj;
    this.date = util.formatAnnouncementDate(this.data.vrijemeKreiranja);
    this.author = this.data.potpis;
  }

  resolveCard = () => {
    return `card-${this.color}`;
  }

  resolveArrow = () =>{
    return `../../assets/arrow_${this.open? 'up' : 'down'}.svg`;
  }


  toggleOpen = () =>{
    this.open = !this.open;
  }

  toggleExpanded = () =>{
    return this.open? 'oglas-expanded' : this.intro!=''? 'oglas-expanded' : 'oglas-collapsed';
  }

  hasIntro=()=>{
    return true;
  }
}
