import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Image} from '../models/Image';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  public API = 'http://localhost:8085';
  public IMAGE_ALL = this.API + '/images/all';
  // Post2 es la ruta que recibe JSON
  public IMAGE_POST = this.API + '/images/post2';

  constructor(public http: HttpClient) { }

  getImages(): Observable<any> {
    return this.http.get(`${this.IMAGE_ALL}`).pipe(
        map((response: Response) => response)
    );
  }

  postImage(image: Image) {
    const data = JSON.stringify(image);
    console.log(data);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = { headers: headers };
    return this.http.post(`${this.IMAGE_POST}`, data, options );
  }
}
