import { trigger, animate, style, transition, state } from '@angular/animations';
import { constants } from './../config';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
  animations: [
    trigger('fadeIn', [
      state('noShow', style({
        width: 0,
        opacity: 0
      })),
      transition('noShow => show', [
        animate('0.3s 0.3s ease-out')
      ]),
      transition('void => *', [
        style({
          width: 0,
          opacity: 0
        }),
        animate('0.3s 0.3s ease-out')
      ])
    ])
  ]
})
export class PaginationComponent implements OnInit {
  settings$: Observable<{ color: string, language: string }>;
  @Input('offset') offset: number;
  @Input('paginate') paginate: (offset) => {};
  @Input('numOfItems') numOfItems: number;
  @Input('show') show = false;
  numOfPages: number;
  color: string;
  showPagination = 'noShow';

  constructor(private settingsStore: Store<{ settings: { color: string, language: string } }>) {
    this.settings$ = settingsStore.select('settings');
    this.settings$.subscribe(settings => {
      this.color = settings.color;
    });
   }

  ngOnInit(): void {
    const inter = setTimeout(() => {
      let numItems = this.numOfItems;
      // this ugly code was written because the js division doesn't output a reliable floor/ceil
      let pages = 0;
      do{
        numItems -= constants.itemsPerPage;
        pages++;
      }while (numItems > 0);
      this.numOfPages = pages;
      this.showPagination = 'show';
    }, 500);
  }

  checkIfNeeded = () => {
    return this.show && this.numOfItems > constants.itemsPerPage;
  }

  paginateLeft = () => {
    if (this.offset != 0) { this.handlePaginate(this.offset - 1); }
  }

  paginateRight = () => {
    if (this.offset != this.numOfPages - 1) { this.handlePaginate(this.offset + 1); }
  }

  handlePaginate = (newOffset) => {
    if (newOffset != this.offset){
      this.showPagination = 'noShow';
      this.paginate(newOffset);
      setInterval(() => {
        this.showPagination = 'show';
      }, 1000);
    }
  }

  resolveStyle = (index) => {
    return index == this.offset ? `pagination-number-active-${this.color}` : `pagination-number-${this.color}`;
  }
}
