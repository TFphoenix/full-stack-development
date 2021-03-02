import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  @ViewChild('fileInput') fileInputElement: ElementRef;

  imageUrl: string;
  isImageUploaded: boolean;

  constructor() {}

  ngOnInit(): void {
    this.isImageUploaded = false;
  }

  onUploadClicked(event) {
    this.fileInputElement.nativeElement.click();
  }

  // called each time file input changes
  onImageUpload(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      // read file as data url
      reader.readAsDataURL(event.target.files[0]);

      // called once readAsDataURL is completed
      reader.onload = event => {
        this.imageUrl = event.target.result.toString();
        this.isImageUploaded = true;
      };
    }
  }
}
