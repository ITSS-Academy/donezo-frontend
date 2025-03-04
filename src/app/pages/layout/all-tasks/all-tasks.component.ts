import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';

import {MaterialModule} from '../../../shared/modules/material.module';
import {filter} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {FilterComponent} from '../../../components/filter/filter.component';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

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
    MaterialModule
  ],
  templateUrl: './all-tasks.component.html',
  styleUrl: './all-tasks.component.scss'
})


export class AllTasksComponent implements AfterViewInit {
  displayedColumns: string[] = ['Tag', 'List', 'Description', 'Name', 'Time'];
  dataSource = new MatTableDataSource<Task>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  readonly dialog = inject(MatDialog);

  ngAfterViewInit() {
    // Gắn phân trang sau khi view đã render
    this.dataSource.paginator = this.paginator;
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(FilterComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}


const ELEMENT_DATA: Task[] = [
  {tag: 1, list: 'Idea', description: 'not done', name: 'Hà', time: 'two weeks'},
  {tag: 2, list: 'In Progress', description: 'done', name: 'Dũng', time: 'one day'},
  {tag: 3, list: 'Done', description: 'done', name: 'Hà', time: 'two weeks'},
  {tag: 4, list: 'Idea', description: 'done', name: 'Thắng', time: 'one month'},
  {tag: 5, list: 'Done', description: 'done', name: 'An', time: 'one month'},
  {tag: 6, list: 'In Progress', description: 'not done', name: 'Phúc', time: 'one week'},
  {tag: 7, list: 'Idea', description: 'not done', name: 'Minh', time: 'one week'},
  {tag: 8, list: 'In Progress', description: 'not done', name: 'Khánh', time: 'three days'},
  {tag: 9, list: 'Done', description: 'not done', name: 'Lâm', time: 'two days'},
  {tag: 10, list: 'Idea', description: 'not done', name: 'Sơn', time: 'one day'},
  {tag: 11, list: 'In Progress', description: 'not done', name: 'Xuân', time: 'five days'},
  {tag: 12, list: 'Done', description: 'done', name: 'Trang', time: 'one month'},
  {tag: 13, list: 'Idea', description: 'done', name: 'Bình', time: 'one day'},
  {tag: 14, list: 'In Progress', description: 'not done', name: 'Châu', time: 'two days'},
  {tag: 15, list: 'Done', description: 'done', name: 'Hạnh', time: 'one week'},
  {tag: 16, list: 'Idea', description: 'not done', name: 'Giang', time: 'one month'},
  {tag: 17, list: 'In Progress', description: 'done', name: 'Mai', time: 'two weeks'},
  {tag: 18, list: 'Done', description: 'not done', name: 'Nam', time: 'three days'},
  {tag: 19, list: 'Idea', description: 'done', name: 'Nhân', time: 'one week'},
  {tag: 20, list: 'In Progress', description: 'not done', name: 'Oanh', time: 'one day'},
  {tag: 21, list: 'Done', description: 'done', name: 'Phương', time: 'two days'},
  {tag: 22, list: 'Idea', description: 'not done', name: 'Quỳnh', time: 'one month'},
  {tag: 23, list: 'In Progress', description: 'done', name: 'Rạng', time: 'one week'},
  {tag: 24, list: 'Done', description: 'not done', name: 'Thảo', time: 'two weeks'},
  {tag: 25, list: 'Idea', description: 'done', name: 'Uyên', time: 'five days'},
  {tag: 26, list: 'In Progress', description: 'not done', name: 'Vinh', time: 'three days'},
  {tag: 27, list: 'Done', description: 'done', name: 'Hải', time: 'one day'},
  {tag: 28, list: 'Idea', description: 'not done', name: 'Yến', time: 'two weeks'},
  {tag: 29, list: 'In Progress', description: 'done', name: 'Anh', time: 'one week'},
  {tag: 30, list: 'Done', description: 'not done', name: 'Bảo', time: 'one month'},
  {tag: 31, list: 'Idea', description: 'not done', name: 'Ngọc', time: 'one day'},
  {tag: 32, list: 'In Progress', description: 'done', name: 'Hoàng', time: 'two days'},
  {tag: 33, list: 'Done', description: 'not done', name: 'Lan', time: 'one week'},
  {tag: 34, list: 'Idea', description: 'done', name: 'Thủy', time: 'one month'},
  {tag: 35, list: 'In Progress', description: 'not done', name: 'Vũ', time: 'three days'},
  {tag: 36, list: 'Done', description: 'done', name: 'Linh', time: 'two weeks'},
  {tag: 37, list: 'Idea', description: 'not done', name: 'Long', time: 'five days'},
  {tag: 38, list: 'In Progress', description: 'done', name: 'Quân', time: 'one day'},
  {tag: 39, list: 'Done', description: 'not done', name: 'Hương', time: 'one week'},
  {tag: 40, list: 'Idea', description: 'done', name: 'Duy', time: 'one month'},
  {tag: 41, list: 'In Progress', description: 'not done', name: 'Tú', time: 'two days'},
  {tag: 42, list: 'Done', description: 'done', name: 'An', time: 'one month'},
  {tag: 43, list: 'Idea', description: 'not done', name: 'My', time: 'one week'},
  {tag: 44, list: 'In Progress', description: 'done', name: 'Bảo', time: 'three days'},
  {tag: 45, list: 'Done', description: 'not done', name: 'Nga', time: 'two days'},
  {tag: 46, list: 'Idea', description: 'done', name: 'Quỳnh', time: 'one day'},
  {tag: 47, list: 'In Progress', description: 'not done', name: 'Khoa', time: 'one week'},
  {tag: 48, list: 'Done', description: 'done', name: 'Mai', time: 'one month'},
  {tag: 49, list: 'Idea', description: 'not done', name: 'Trung', time: 'five days'},
  {tag: 50, list: 'In Progress', description: 'done', name: 'Yến', time: 'two days'},
  {tag: 51, list: 'Idea', description: 'not done', name: 'Nam', time: 'one day'},
  {tag: 52, list: 'In Progress', description: 'done', name: 'Phát', time: 'two weeks'},
  {tag: 53, list: 'Done', description: 'not done', name: 'Hậu', time: 'three days'},
  {tag: 54, list: 'Idea', description: 'done', name: 'Tâm', time: 'one week'},
  {tag: 55, list: 'In Progress', description: 'not done', name: 'Vy', time: 'one month'},
  {tag: 56, list: 'Done', description: 'done', name: 'Thảo', time: 'one day'},
  {tag: 57, list: 'Idea', description: 'not done', name: 'Khang', time: 'two days'},
  {tag: 58, list: 'In Progress', description: 'done', name: 'Đức', time: 'one week'},
  {tag: 59, list: 'Done', description: 'not done', name: 'Lộc', time: 'one month'},
  {tag: 60, list: 'Idea', description: 'done', name: 'Diễm', time: 'three days'},
  {tag: 61, list: 'In Progress', description: 'not done', name: 'Thiên', time: 'two weeks'},
  {tag: 62, list: 'Done', description: 'done', name: 'Bích', time: 'one week'},
  {tag: 63, list: 'Idea', description: 'not done', name: 'Hoài', time: 'one day'},
  {tag: 64, list: 'In Progress', description: 'done', name: 'Minh', time: 'five days'},
  {tag: 65, list: 'Done', description: 'not done', name: 'Tú', time: 'one month'},
  { tag: 66, list: 'Idea', description: 'not done', name: 'Lan', time: 'one day' },
  { tag: 67, list: 'In Progress', description: 'done', name: 'Phương', time: 'two weeks' },
  { tag: 68, list: 'Done', description: 'not done', name: 'Thịnh', time: 'three days' },
  { tag: 69, list: 'Idea', description: 'done', name: 'Quang', time: 'one week' },
  { tag: 70, list: 'In Progress', description: 'not done', name: 'Hằng', time: 'one month' },
  { tag: 71, list: 'Done', description: 'done', name: 'Tuấn', time: 'one day' },
  { tag: 72, list: 'Idea', description: 'not done', name: 'Tài', time: 'two days' },
  { tag: 73, list: 'In Progress', description: 'done', name: 'Kim', time: 'one week' },
  { tag: 74, list: 'Done', description: 'not done', name: 'Vy', time: 'one month' },
  { tag: 75, list: 'Idea', description: 'done', name: 'Duyên', time: 'three days' },
  { tag: 76, list: 'In Progress', description: 'not done', name: 'Bình', time: 'two weeks' },
  { tag: 77, list: 'Done', description: 'done', name: 'Thảo', time: 'one week' },
  { tag: 78, list: 'Idea', description: 'not done', name: 'Cường', time: 'one day' },
  { tag: 79, list: 'In Progress', description: 'done', name: 'Trang', time: 'five days' },
  { tag: 80, list: 'Done', description: 'not done', name: 'Hoàn', time: 'one month' },
  { tag: 81, list: 'Idea', description: 'not done', name: 'Nam', time: 'two days' },
  { tag: 82, list: 'In Progress', description: 'done', name: 'Linh', time: 'one week' },
  { tag: 83, list: 'Done', description: 'done', name: 'Phát', time: 'three days' },
  { tag: 84, list: 'Idea', description: 'not done', name: 'Nga', time: 'one month' },
  { tag: 85, list: 'In Progress', description: 'not done', name: 'Tú', time: 'one day' },
  { tag: 86, list: 'Done', description: 'done', name: 'Lộc', time: 'one week' },
  { tag: 87, list: 'Idea', description: 'not done', name: 'My', time: 'two weeks' },
  { tag: 88, list: 'In Progress', description: 'done', name: 'Sơn', time: 'one month' },
  { tag: 89, list: 'Done', description: 'not done', name: 'Thanh', time: 'one day' },
  { tag: 90, list: 'Idea', description: 'done', name: 'Khoa', time: 'three days' },
  { tag: 91, list: 'In Progress', description: 'not done', name: 'Yến', time: 'one week' },
  { tag: 92, list: 'Done', description: 'done', name: 'Nhung', time: 'two days' },
  { tag: 93, list: 'Idea', description: 'not done', name: 'Vũ', time: 'one month' },
  { tag: 94, list: 'In Progress', description: 'done', name: 'Mai', time: 'one day' },
  { tag: 95, list: 'Done', description: 'not done', name: 'Hậu', time: 'one week' },
  { tag: 96, list: 'Idea', description: 'done', name: 'Hạnh', time: 'two weeks' },
  { tag: 97, list: 'In Progress', description: 'not done', name: 'Thịnh', time: 'one month' },
  { tag: 98, list: 'Done', description: 'done', name: 'An', time: 'one day' },
  { tag: 99, list: 'Idea', description: 'not done', name: 'Hoàng', time: 'three days' },
  { tag: 100, list: 'In Progress', description: 'done', name: 'Bảo', time: 'one week' }
];



