import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const OGLASI_URL = 'https://efee.etf.unibl.org:8443/api/public/oglasne-ploce/';

@Injectable({
  providedIn: 'root'
})
export class OglasiService extends DataService{
  private oglasiUrl = OGLASI_URL;
  constructor(public oglasiHttpClient: HttpClient) {
    super(oglasiHttpClient, OGLASI_URL);
  }

  getSingle2 = (id) => {
    return this.oglasiHttpClient.get(this.oglasiUrl + id);
  }
}
