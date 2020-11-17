import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-oglas',
  templateUrl: './oglas.component.html',
  styleUrls: ['./oglas.component.css']
})
export class OglasComponent implements OnInit {
  @Input('title') title: string;
  @Input('content') content: string;
  @Input('color') color : string;
  @Input('language') language : string;

  constructor() { }

  ngOnInit(): void {
  }

  resolveCard = () =>{
    return `card-${this.color}`;
  }

}
