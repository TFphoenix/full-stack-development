import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ImagesRequestService } from 'src/app/core/services/images-request/images-request.service';
import { IImage } from 'src/app/shared/interfaces/image.interface';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  displayedColumns: string[] = ['select', 'name', 'size', 'result', 'download'];
  dataSource = new MatTableDataSource<IImage>([]);
  selection = new SelectionModel<IImage>(true, []);

  constructor(private readonly _imagesRequestService: ImagesRequestService) {}

  ngOnInit(): void {
    this._imagesRequestService.getAllImages().subscribe(images => {
      this.dataSource = new MatTableDataSource<IImage>(images);
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: IImage): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
}
