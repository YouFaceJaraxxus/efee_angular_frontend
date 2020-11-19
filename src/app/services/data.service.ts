import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private httpClient: HttpClient, private url: string) {

  }

  getAll = () => {
    return this.httpClient.get(this.url);
  }

  getAllFromMultiple(ids: number[]): Observable<any>[]{
    const subscribeList = [];
    for (const i in ids){
      const id = ids[i];
      subscribeList.push(this.httpClient.get(this.url + id));
    }
    return subscribeList;
  }

  getSingle = (id: string|number) => {
    return this.httpClient.get(this.url + id);
  }
}
