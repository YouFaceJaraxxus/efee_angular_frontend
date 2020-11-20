import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import {constants, util} from '../config'

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
    ]),
    trigger('fade', [
      transition('void => *', [
        style({opacity:0, width:0}),
        animate('1s ease-out')
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
  @Input('yearId') yearId : string;
  title : string;
  intro: string;
  content: string;
  date: string;
  author: string;
  open = false;
  attachment : string;

  constructor() {
   }

  ngOnInit(): void {
    this.retry();
  }

  parseAttachment = (id, attachment)=>{
    if(attachment){
      if(attachment.length>0) return util.getDownloadLink(id);
      else return null;
    }
    return null;
  }

  retry = () =>{
    setTimeout(()=>{
      if(this.data){
        this.title = this.data.naslov;
        this.intro = this.data.uvod;
        this.content = this.data.sadrzaj;
        this.date = util.formatAnnouncementDate(this.data.vrijemeKreiranja, this.language);
        this.author = this.data.potpis;
        this.attachment = this.parseAttachment(this.data.id,this.data.oglasPrilozi);
      }else this.retry();
    }, 250);
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

  getLink = () =>{
    return constants.SHARE_LINK + this.yearId +"/" + this.data.id;
  }

  getShortLink = () =>{
    return('/oglas/' + this.yearId +"/" + this.data.id)
  }

  copyLink = () =>{
    util.copyLinkToClipboard(this.getLink(), this.language);
  }

  copyText = () =>{
    util.copyToClipboard(this.title + " " + this.date + " " + this.content +" " + this.author, this.language);
  }

  parseText = (text) =>{
    return util.transliterate(text, this.language);
  }
}
