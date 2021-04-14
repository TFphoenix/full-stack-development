import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FunctionsRequestService } from 'src/app/core/services/functions-request/functions-request.service';
import { ImagesRequestService } from 'src/app/core/services/images-request/images-request.service';
import { ILog } from 'src/app/shared/interfaces/log.interface';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {
  displayedColumns: string[] = ['uid', 'log', 'createdAt'];
  dataSource = new MatTableDataSource<ILog>([]);

  constructor(
    private readonly _functionsRequestService: FunctionsRequestService,
    private readonly _imagesRequestService: ImagesRequestService
  ) {}

  ngOnInit(): void {
    //  TODO: Uncomment this after fixing CORS error
    // this._functionsRequestService.getAllLogs().subscribe(logs => {
    //   this.dataSource = new MatTableDataSource<ILog>(logs);
    // });

    // TODO: Remove this after fixing CORS error
    this._imagesRequestService.getAllImages().subscribe(images => {
      let logs: ILog[] = [];
      images.forEach(image => {
        logs.push({
          uid: 123,
          log: 'test',
          createdAt: new Date()
        });
      });
      this.dataSource = new MatTableDataSource<ILog>(logs);
    });
  }
}
