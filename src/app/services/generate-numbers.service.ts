import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Response } from '../models/resp.model';
import { DataService } from './data.service';

const basePath = 'randominteger/';

@Injectable({
  providedIn: 'root',
})
export class GenerateNumbersService {
  constructor(private _dataService: DataService) {}

  public getGeneratedNumbers(paginationPath: string = ''): Observable<Response> {
    return this._dataService.getResource<Response>(`${basePath}${paginationPath}`, Response);
  }

  public generateNewNumber(): Observable<any> {
    return this._dataService.httpGet(`${environment.apiUrl}${basePath}generate/`, (res) => res);
  }
}
