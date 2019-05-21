import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  public API = 'http://localhost:8085';
  public IMAGE_ALL = this.API + '/images/all';

  constructor(public http: HttpClient) { }

  getImages(): Observable<any> {
    return this.http.get(`${this.IMAGE_ALL}`).pipe(
        map((response: Response) => response)
    );
  }
}
