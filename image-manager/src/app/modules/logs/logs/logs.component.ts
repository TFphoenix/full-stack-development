import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FunctionsRequestService } from 'src/app/core/services/functions-request/functions-request.service';
import { ILog } from 'src/app/shared/interfaces/log.interface';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {
  displayedColumns: string[] = ['uid', 'log', 'createdAt'];
  dataSource = new MatTableDataSource<ILog>([]);

  constructor(private readonly _functionsRequestService: FunctionsRequestService) {}

  ngOnInit(): void {
    this._functionsRequestService.getAllLogs().subscribe(logs => {
      this.dataSource.data = logs;
    });
  }
}
