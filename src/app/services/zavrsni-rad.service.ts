import { constants } from './../config';
import { DataService } from './data.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { util } from '../config';

const ZAVRSNI_RADOVI_URL = 'https://efee.etf.unibl.org:8443/api/public/zavrsni-radovi';

@Injectable({
  providedIn: 'root'
})
export class ZavrsniRadService extends DataService{
  private oglasiUrl = ZAVRSNI_RADOVI_URL;
  constructor(public zavrsniRadoviHttpClient: HttpClient) {
    super(zavrsniRadoviHttpClient, ZAVRSNI_RADOVI_URL);
  }

  getZavrsniRadovi = (typeId, offset, searchValue, includeSearch, searchParam) => {
    if (includeSearch == null || !includeSearch) searchValue = '';
    return this.zavrsniRadoviHttpClient.get(
      `${ZAVRSNI_RADOVI_URL}?filter=${util.getZavrsniRadoviFilterString([{operator:"equal",field:"trenutniStatus.statusZavrsnogRada.id",value:typeId}, {operator:'ilike', field:searchParam, value:searchValue?searchValue : ''}], [{operator:"desc",field:"trenutniStatus.vrijemeKreiranja"}], constants.itemsPerPage, offset*constants.itemsPerPage)}`
    );
  }

  getSingleZavrsniRad = (id) => {
    return this.zavrsniRadoviHttpClient.get(
      `${ZAVRSNI_RADOVI_URL}?filter=${util.getZavrsniRadoviFilterString([{operator:"equal",field:"id",value:id}], null, 1, 0)}`
    );
  }
}
