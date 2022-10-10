import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from "@angular/core";
import { catchError, map, Observable, of, publishReplay, refCount } from 'rxjs';
import { environment } from "src/environments/environment";
import { BaseModel, IModelConstructor } from '../models/base.model';

const API_URL = `${environment.apiUrl}`;
const TOKEN = `${environment.apiToken}`;

type MapFunc<T> = (value: any, index: number) => T;

@Injectable({
  providedIn: 'root',
})
export class DataService {

  constructor(private http: HttpClient) {}

  public getResource<T extends BaseModel>(
    url: string,
    modelType: IModelConstructor<T>,
  ): Observable<T> {
    return this.httpGet(`${API_URL}${url}`, (res) =>
      res.response ? new modelType(res.response) : new modelType(res)
    );
  }

  public getResourcePath<T extends BaseModel>(
    url: string,
    modelType: IModelConstructor<T>,
  ): Observable<T> {
    return this.httpGet(url, (res) =>
      res.response ? new modelType(res.response) : new modelType(res)
    );
  }

  public httpGet<T>(url: string, mapFunc: MapFunc<T>): Observable<T> {
    return this.http.get(url, { headers: this.getHeader() }).pipe(
      catchError(err => this.handleError(err)),
      map(mapFunc),
      publishReplay(1), // basic caching here
      refCount()
    );
  }

  private getHeader() {
    const token = TOKEN;
    if (token) {
      return new HttpHeaders({
        Authorization: `Token ${token}`,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Request-Headers':
          'access-control-allow-origin, content-type, x-ijt',
        'Content-Type': 'application/json',
      });
    } else {
      return new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': 'access-control-allow-origin, content-type, x-ijt',
      });
    }
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
    if (error.error.error == 'Unauthorized') {
      console.log('Got http error: Unauthorized');
    }
    return of({error: error});
  }
}
