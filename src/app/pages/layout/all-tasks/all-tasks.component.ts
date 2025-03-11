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
  displayedColumns: string[] = ['title', 'board', 'list', 'members', 'tags'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  constructor() {
  }

  readonly dialog = inject(MatDialog);

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(FilterComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  selected = 'option2';
}

export interface PeriodicElement {
  title: string;
  board: string;
  list: string;
  members: string;
  tags: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    title: 'Hom nay toi lau nha',
    board: 'Note',
    list: 'To Do',
    members: 'Quan',
    tags: 'Label',
  },
  {
    title: 'Hom nay toi lau nha',
    board: 'Note',
    list: 'To Do',
    members: 'Quan',
    tags: 'Label',
  },
  {
    title: 'Hom nay toi lau nha',
    board: 'Note',
    list: 'To Do',
    members: 'Quan',
    tags: 'Label',
  },
  {
    title: 'Hom nay toi lau nha',
    board: 'Note',
    list: 'To Do',
    members: 'Quan',
    tags: 'Label',
  },
  {
    title: 'Hom nay toi lau nha',
    board: 'Note',
    list: 'To Do',
    members: 'Quan',
    tags: 'Label',
  },
  {
    title: 'Hom nay toi lau nha',
    board: 'Note',
    list: 'To Do',
    members: 'Quan',
    tags: 'Label',
  },
  {
    title: 'Hom nay toi lau nha',
    board: 'Note',
    list: 'To Do',
    members: 'Quan',
    tags: 'Label',
  },
  {
    title: 'Hom nay toi lau nha',
    board: 'Note',
    list: 'To Do',
    members: 'Quan',
    tags: 'Label',
  },
  {
    title: 'Hom nay toi lau nha',
    board: 'Note',
    list: 'To Do',
    members: 'Quan',
    tags: 'Label',
  },
  {
    title: 'Hom nay toi lau nha',
    board: 'Note',
    list: 'To Do',
    members: 'Quan',
    tags: 'Label',
  },
  {
    title: 'Hom nay toi lau nha',
    board: 'Note',
    list: 'To Do',
    members: 'Quan',
    tags: 'Label',
  },
  {
    title: 'Hom nay toi lau nha',
    board: 'Note',
    list: 'To Do',
    members: 'Quan',
    tags: 'Label',
  },
  {
    title: 'Hom nay toi lau nha',
    board: 'Note',
    list: 'To Do',
    members: 'Quan',
    tags: 'Label',
  },
  {
    title: 'Hom nay toi lau nha',
    board: 'Note',
    list: 'To Do',
    members: 'Quan',
    tags: 'Label',
  },
  {
    title: 'Hom nay toi lau nha',
    board: 'Note',
    list: 'To Do',
    members: 'Quan',
    tags: 'Label',
  },
  {
    title: 'Hom nay toi lau nha',
    board: 'Note',
    list: 'To Do',
    members: 'Quan',
    tags: 'Label',
  },

  {
    title: 'Hom nay toi lau nha',
    board: 'Note',
    list: 'To Do',
    members: 'Quan',
    tags: 'Label',
  },
  {
    title: 'Hom nay toi lau nha',
    board: 'Note',
    list: 'To Do',
    members: 'Quan',
    tags: 'Label',
  },
  {
    title: 'Hom nay toi lau nha',
    board: 'Note',
    list: 'To Do',
    members: 'Quan',
    tags: 'Label',
  },
  {
    title: 'Hom nay toi lau nha',
    board: 'Note',
    list: 'To Do',
    members: 'Quan',
    tags: 'Label',
  },
  {
    title: 'Hom nay toi lau nha',
    board: 'Note',
    list: 'To Do',
    members: 'Quan',
    tags: 'Label',
  },
  {
    title: 'Hom nay toi lau nha',
    board: 'Note',
    list: 'To Do',
    members: 'Quan',
    tags: 'Label',
  },
  {
    title: 'Hom nay toi lau nha',
    board: 'Note',
    list: 'To Do',
    members: 'Quan',
    tags: 'Label',
  },
  {
    title: 'Hom nay toi lau nha',
    board: 'Note',
    list: 'To Do',
    members: 'Quan',
    tags: 'Label',
  },
  {
    title: 'Hom nay toi lau nha',
    board: 'Note',
    list: 'To Do',
    members: 'Quan',
    tags: 'Label',
  },
  {
    title: 'Hom nay toi lau nha',
    board: 'Note',
    list: 'To Do',
    members: 'Quan',
    tags: 'Label',
  },
  {
    title: 'Hom nay toi lau nha',
    board: 'Note',
    list: 'To Do',
    members: 'Quan',
    tags: 'Label',
  },
  {
    title: 'Hom nay toi lau nha',
    board: 'Note',
    list: 'To Do',
    members: 'Quan',
    tags: 'Label',
  },
  {
    title: 'Hom nay toi lau nha',
    board: 'Note',
    list: 'To Do',
    members: 'Quan',
    tags: 'Label',
  },
  {
    title: 'Hom nay toi lau nha',
    board: 'Note',
    list: 'To Do',
    members: 'Quan',
    tags: 'Label',
  },
  {
    title: 'Hom nay toi lau nha',
    board: 'Note',
    list: 'To Do',
    members: 'Quan',
    tags: 'Label',
  },
  {
    title: 'Hom nay toi lau nha',
    board: 'Note',
    list: 'To Do',
    members: 'Quan',
    tags: 'Label',
  },
  {
    title: 'Hom nay toi lau nha',
    board: 'Note',
    list: 'To Do',
    members: 'Quan',
    tags: 'Label',
  },

  {
    title: 'Hom nay toi lau nha',
    board: 'Note',
    list: 'To Do',
    members: 'Quan',
    tags: 'Label',
  },
  {
    title: 'Hom nay toi lau nha',
    board: 'Note',
    list: 'To Do',
    members: 'Quan',
    tags: 'Label',
  },
  {
    title: 'Hom nay toi lau nha',
    board: 'Note',
    list: 'To Do',
    members: 'Quan',
    tags: 'Label',
  },
  {
    title: 'Hom nay toi lau nha',
    board: 'Note',
    list: 'To Do',
    members: 'Quan',
    tags: 'Label',
  },
  {
    title: 'Hom nay toi lau nha',
    board: 'Note',
    list: 'To Do',
    members: 'Quan',
    tags: 'Label',
  },
  {
    title: 'Hom nay toi lau nha',
    board: 'Note',
    list: 'To Do',
    members: 'Quan',
    tags: 'Label',
  },
  {
    title: 'Hom nay toi lau nha',
    board: 'Note',
    list: 'To Do',
    members: 'Quan',
    tags: 'Label',
  },
  {
    title: 'Hom nay toi lau nha',
    board: 'Note',
    list: 'To Do',
    members: 'Quan',
    tags: 'Label',
  },
  {
    title: 'Hom nay toi lau nha',
    board: 'Note',
    list: 'To Do',
    members: 'Quan',
    tags: 'Label',
  },
  {
    title: 'Hom nay toi lau nha',
    board: 'Note',
    list: 'To Do',
    members: 'Quan',
    tags: 'Label',
  },
  {
    title: 'Hom nay toi lau nha',
    board: 'Note',
    list: 'To Do',
    members: 'Quan',
    tags: 'Label',
  },
  {
    title: 'Hom nay toi lau nha',
    board: 'Note',
    list: 'To Do',
    members: 'Quan',
    tags: 'Label',
  },
  {
    title: 'Hom nay toi lau nha',
    board: 'Note',
    list: 'To Do',
    members: 'Quan',
    tags: 'Label',
  },
  {
    title: 'Hom nay toi lau nha',
    board: 'Note',
    list: 'To Do',
    members: 'Quan',
    tags: 'Label',
  },
  {
    title: 'Hom nay toi lau nha',
    board: 'Note',
    list: 'To Do',
    members: 'Quan',
    tags: 'Label',
  },
  {
    title: 'Hom nay toi lau nha',
    board: 'Note',
    list: 'To Do',
    members: 'Quan',
    tags: 'Label',
  },
  {
    title: 'Hom nay toi lau nha',
    board: 'Note',
    list: 'To Do',
    members: 'Quan',
    tags: 'Label',
  },

  {
    title: 'Hom nay toi lau nha',
    board: 'Note',
    list: 'To Do',
    members: 'Quan',
    tags: 'Label',
  },
];




