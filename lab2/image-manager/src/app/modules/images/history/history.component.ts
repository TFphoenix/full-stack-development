import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  size: number;
  result: number;
  download: string;
  position: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, size: 1, name: 'Hydrogen', result: 1.0079, download: 'H' },
  { position: 2, size: 2, name: 'Helium', result: 4.0026, download: 'He' },
  { position: 3, size: 3, name: 'Lithium', result: 6.941, download: 'Li' },
  { position: 4, size: 4, name: 'Beryllium', result: 9.0122, download: 'Be' },
  { position: 5, size: 5, name: 'Boron', result: 10.811, download: 'B' },
  { position: 6, size: 6, name: 'Carbon', result: 12.0107, download: 'C' },
  { position: 7, size: 7, name: 'Nitrogen', result: 14.0067, download: 'N' },
  { position: 8, size: 8, name: 'Oxygen', result: 15.9994, download: 'O' },
  { position: 9, size: 9, name: 'Fluorine', result: 18.9984, download: 'F' },
  { position: 10, size: 10, name: 'Neon', result: 20.1797, download: 'Ne' }
];

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  displayedColumns: string[] = ['select', 'name', 'size', 'result', 'download'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

  constructor() {}

  ngOnInit(): void {}

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
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
}
