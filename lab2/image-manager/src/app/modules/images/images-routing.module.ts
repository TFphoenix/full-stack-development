import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HistoryComponent } from './history/history.component';
import { UploadComponent } from './upload/upload.component';

const routes: Routes = [
  {
    path: 'history',
    component: HistoryComponent
  },
  {
    path: 'upload',
    component: UploadComponent
  },
  {
    path: '',
    component: HistoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImagesRoutingModule {}
