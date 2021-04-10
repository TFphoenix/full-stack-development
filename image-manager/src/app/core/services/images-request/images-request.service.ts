import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from 'src/app/shared/constants';
import { IImage } from 'src/app/shared/interfaces/image.interface';
import { RequestService } from '../request/request.service';

@Injectable({
  providedIn: 'root'
})
export class ImagesRequestService {
  constructor(private readonly _requestService: RequestService) { }

  getAllImages(): Observable<IImage[]> {
    return this._requestService.get(Constants.ApiEndpoints.images);
  }

  getImageById(id: string): Observable<IImage> {
    return this._requestService.get(Constants.ApiEndpoints.images + `/${id}`);
  }

  saveImages(id: string, images: IImage[]) {
    return this._requestService.post(Constants.ApiEndpoints.images, images);
  }

  uploadImage(image: File) {
    return this._requestService.postImage(Constants.ApiEndpoints.images + '/upload', image);
  }
}
