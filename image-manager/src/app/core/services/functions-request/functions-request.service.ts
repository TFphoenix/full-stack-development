import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from 'src/app/shared/constants';
import { RequestType } from 'src/app/shared/enums/request-type.enum';
import { ILog } from 'src/app/shared/interfaces/log.interface';
import { RequestService } from '../request/request.service';

@Injectable({
  providedIn: 'root'
})
export class FunctionsRequestService {
  constructor(private readonly _requestService: RequestService) {}

  getAllLogs(): Observable<ILog[]> {
    return this._requestService.get(Constants.FunctionsEndpoints.logs, RequestType.Functions);
  }
}
