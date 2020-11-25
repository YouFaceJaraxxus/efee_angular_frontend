import { trigger, state, style, animate, transition } from '@angular/animations';
import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { constants, util } from '../config';

@Component({
  selector: 'app-zavrsni-rad',
  templateUrl: './zavrsni-rad.component.html',
  styleUrls: ['./zavrsni-rad.component.css'],
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({
        height: 0,
        overflow: 'hidden',
        padding: 0,
        margin: 0,
        opacity: 0
      })),

      transition('collapsed => expanded', [
        animate('0.5s ease-out', style({
          height: '*',
          overflow: 'auto',
          padding: '0.5%'
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
    trigger('customFade', [
      transition('void => *', [
        style({opacity: 0}),
        animate('1s 0.5s ease-out')
      ])
    ])
  ]
})
export class ZavrsniRadComponent implements OnInit {
  @Input('color') color: string;
  @Input('language') language: string;
  @Input('short') short: boolean;
  @Input('data') data: any;
  @Input('single') single: boolean;
  title: string;
  intro: string;
  content: string;
  date: string;
  president: string;
  mentor: string;
  member: string;
  open = false;
  attachment: string;
  status: string;

  constructor() {
   }

  ngOnInit(): void {
    this.retry();
  }

  parseAttachment = (id, attachment) => {
    if (attachment){
      if (attachment.length > 0) { return util.getDownloadLink(id); }
      else { return null; }
    }
    return null;
  }

  retry = () => {
    setTimeout(() => {
      if (this.data){
        this.title = this.data.tema;
        this.content = this.data.obrazlozenje;
        this.date = util.formatAnnouncementDate(this.data.trenutniStatus.vrijemeKreiranja, this.language);
        this.status = this.data.trenutniStatus.statusZavrsnogRada.naziv;
        this.president = this.data.predsjednikKomisije.ime;
        this.mentor = this.data.mentor.ime;
        this.member = this.data.clanKomisije.ime;
      }else { this.retry(); }
    }, 250);
  }
  resolveCard = () => {
    return `card-${this.color}`;
  }

  resolveArrow = () => {
    return `../../assets/arrow_${this.open ? 'up' : 'down'}.svg`;
  }


  toggleOpen = () => {
    this.open = !this.open;
  }

  toggleExpanded = () => {
    return this.open ? 'zavrsni-rad-expanded' : this.intro != '' ? 'zavrsni-rad-expanded' : 'zavrsni-rad-collapsed';
  }

  getLink = () => {
    return constants.SHARE_ZAVRSNI_RAD_LINK + this.data.id;
  }

  getShortLink = () => {
    return('/zavrsni-rad/'+ this.data.id);
  }

  copyLink = () => {
    util.copyLinkToClipboard(this.getLink(), this.language);
  }

  copyText = () => {
    util.copyToClipboard(this.title + ' ' + this.date + ' ' + this.content + ' ' + this.parseComission(), this.language);
  }

  parseComission = () =>{
    return `Predsjednik komisije: ${this.president}, mentor: ${this.mentor}, član komisije: ${this.member}.`;
  }

  parseText = (text) => {
    return util.transliterate(text, this.language);
  }


}
