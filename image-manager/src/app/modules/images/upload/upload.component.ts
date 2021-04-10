import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ImagesRequestService } from 'src/app/core/services/images-request/images-request.service';
import { RequestService } from 'src/app/core/services/request/request.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  @ViewChild('fileInput') fileInputElement: ElementRef;

  imageUrl: string;
  isImageUploaded: boolean;
  imageToUpload: File = null;

  constructor(
    private readonly _requestService: RequestService,
    private readonly _imageRequestService: ImagesRequestService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.isImageUploaded = false;
  }

  onUploadClicked() {
    this.fileInputElement.nativeElement.click();
  }

  // called each time file input changes
  onImageUpload(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      // read file as data url
      reader.readAsDataURL(event.target.files[0]);

      this.imageToUpload = event.target.files[0];
      // called once readAsDataURL is completed
      reader.onload = event => {
        this.imageUrl = event.target.result.toString();
        this.isImageUploaded = true;
      };
    }
  }

  canSendImage(): boolean {
    if (this.isImageUploaded) {
      if (this.imageToUpload) {
        return true;
      }
    }
    return false;
  }

  onImageUploaded() {
    if (this.canSendImage()) {
      this._imageRequestService
        .uploadImage(this.imageToUpload)
        .subscribe();
        
      setTimeout(
        () => {
          this._router.navigate(['images/history']);
        },
        2000);
    }
  }
}
