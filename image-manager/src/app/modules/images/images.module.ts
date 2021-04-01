import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImagesRoutingModule } from './images-routing.module';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { HistoryComponent } from './history/history.component';
import { UploadComponent } from './upload/upload.component';

@NgModule({
  declarations: [HistoryComponent, UploadComponent],
  imports: [SharedModule, ImagesRoutingModule, MaterialModule]
})
export class ImagesModule {}
