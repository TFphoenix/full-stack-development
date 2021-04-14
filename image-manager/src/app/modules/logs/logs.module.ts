import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogsRoutingModule } from './logs-routing.module';
import { LogsComponent } from './logs/logs.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { FunctionsRequestService } from 'src/app/core/services/functions-request/functions-request.service';

@NgModule({
  providers: [FunctionsRequestService],
  declarations: [LogsComponent],
  imports: [SharedModule, CommonModule, LogsRoutingModule, MaterialModule]
})
export class LogsModule {}
