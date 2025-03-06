import {Component, inject, ViewChild, AfterViewInit} from '@angular/core';
import {MaterialModule} from '../../../shared/modules/material.module';
import {MatDialog} from '@angular/material/dialog';
import {FilterComponent} from '../../../components/filter/filter.component';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {NgxPaginationModule} from 'ngx-pagination';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
export interface Task {
  tag: number;
  list: string;
  description: string;
  name: string;
  time: string;
}


@Component({
  selector: 'app-all-tasks',
  standalone: true,
  imports: [
    MaterialModule, NgxDatatableModule, NgxPaginationModule,
  ],
  templateUrl: './all-tasks.component.html',
  styleUrl: './all-tasks.component.scss'
})


export class AllTasksComponent implements AfterViewInit {
  displayedColumns: string[] = ['Tag', 'List', 'Description', 'Name', 'Time'];
  dataSource = new MatTableDataSource<Task>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  protected readonly MaterialModule = MaterialModule;
  // protected readonly filter = filter;

  readonly dialog = inject(MatDialog);

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(FilterComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }


}


const ELEMENT_DATA: Task[] = [
  {tag: 1, list: 'Work', description: "not done", name: 'H', time: "two weeks"},
  {tag: 2, list: 'Task', description: "done", name: 'D', time: "One day"},
  {tag: 3, list: 'Sidebar', description: "done", name: 'H', time: "two weeks"},
  {tag: 4, list: 'Navbar', description: "done", name: 'T', time: "one month"},
  {tag: 5, list: 'All task', description: "done", name: 'A', time: "one month"},
  {tag: 6, list: 'Kanban', description: "not done", name: 'F', time: "one week"},
  {tag: 7, list: 'All board', description: "not done", name: 'J', time: "one week"},
  {tag: 8, list: 'sign in', description: "not done", name: 'K', time: "three days"},
  {tag: 9, list: 'sign out', description: "not done", name: 'L', time: "two days"},
  {tag: 10, list: 'services', description: "not done", name: 'S', time: "one day"},
  {tag: 11, list: 'shared', description: "not done", name: 'X', time: "five days"},
  {tag: 12, list: 'styles', description: "done", name: 'Z', time: "one month"},
  {tag: 13, list: 'styles', description: "done", name: 'Z', time: "one month"},
  {tag: 14, list: 'styles', description: "done", name: 'Z', time: "one month"},
  {tag: 15, list: 'styles', description: "done", name: 'Z', time: "one month"},
  {tag: 16, list: 'styles', description: "done", name: 'Z', time: "one month"},
  {tag: 17, list: 'styles', description: "done", name: 'Z', time: "one month"},
];



