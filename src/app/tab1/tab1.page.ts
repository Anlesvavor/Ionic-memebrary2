import {Component, OnInit} from '@angular/core';
import {ImageService} from '../api/image.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  images: any = [];

  constructor(public imageService: ImageService, private router: Router) {}

  ngOnInit(): void {
  }

  ionViewWillEnter() {
    this.imageService.getImages().subscribe(
        (data: any) => {this.images = data; console.log(this.images); },
        (error) => {console.log(error); }
        );
  }
}

