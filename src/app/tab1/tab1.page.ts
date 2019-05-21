import {Component, OnInit} from '@angular/core';
import {ImageService} from '../api/image.service';
import {Router} from '@angular/router';
import {File, FileEntry} from '@ionic-native/file';
import {HttpClient} from '@angular/common/http';
import {WebView} from '@ionic-native/ionic-webview/ngx';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Image} from '../models/Image';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  form: FormGroup;
  images: any = [];
  upload: Image = new Image();


  constructor(
    public imageService: ImageService, private router: Router,
    private http: HttpClient,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      title: null,
      uploadImage: null
    });
  }

  ngOnInit(): void {
  }

  ionViewWillEnter() {
    this.imageService.getImages().subscribe(
      (data: any) => {
        this.images = data;
        console.log(this.images);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  uploadImage() {
    this.upload.id = 0;
    this.upload.user = 1;
    console.log(this.upload);
  }

  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          this.form.get('uploadImage').setValue({
            filename: file.name,
            filetype: file.type,
            value: reader.result.split(',')[1]
          });
        }
      };
    }
  }

  onSubmit() {
    this.upload.title = this.form.value.title;
    this.upload.image = 'data:image/jpeg;base64,' + this.form.value.uploadImage.value;
    this.upload.id = 1;
    this.upload.user = 1;
    console.log(this.upload);
    this.imageService.postImage(this.upload).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}

