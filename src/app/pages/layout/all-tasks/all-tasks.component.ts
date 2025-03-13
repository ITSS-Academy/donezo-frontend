import {Component, inject, ViewChild, AfterViewInit, signal, OnInit, OnDestroy} from '@angular/core';
import {MaterialModule} from '../../../shared/modules/material.module';
import {MatDialog} from '@angular/material/dialog';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {NgxPaginationModule} from 'ngx-pagination';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {DatePipe, NgClass, NgForOf, NgIf, NgStyle} from '@angular/common';
import {ListCard} from '../../../models/list.model';
import {Store} from '@ngrx/store';
import {CardState} from '../../../ngrx/card/card.state';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import * as cardActions from '../../../ngrx/card/card.actions';
import {MatSort, Sort} from '@angular/material/sort';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {NgxSkeletonLoaderComponent} from 'ngx-skeleton-loader';

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
    MaterialModule, NgxDatatableModule, NgxSkeletonLoaderComponent, NgxPaginationModule, NgClass, DatePipe, NgStyle, NgIf, NgForOf,
  ],
  templateUrl: './all-tasks.component.html',
  styleUrl: './all-tasks.component.scss'
})

export class AllTasksComponent implements AfterViewInit, OnInit, OnDestroy {
  displayedColumns: string[] = ['title', 'board', 'tags', 'list'];
  dataSource = new MatTableDataSource<any>();

  private dialog: any;

  isGettingCards!: boolean;
  cards!: ListCard[];

  constructor(
    private store: Store<{ card: CardState }>,
    private router: Router,
  ) {
    this.store.dispatch(cardActions.getCardsByUserId());
  }

  subscription: Subscription[] = [];

  ngOnInit() {
    this.subscription.push(
      this.store.select('card').subscribe((cardState) => {
        this.dataSource.data = cardState.cards;
        this.cards = cardState.cards;
      }),
      this.store
        .select('card', 'isGettingCardsByUser')
        .subscribe((isGettingCards) => {
          this.isGettingCards = isGettingCards;
        }),
    );
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      return data.labels
        ? data.labels.some((label: any) =>
          label.name.toLowerCase().includes(filter),
        )
        : false;
    };
  }

  ngOnDestroy() {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getContrastTextColor(hexColor: string) {
    let r = parseInt(hexColor.substring(1, 3), 16);
    let g = parseInt(hexColor.substring(3, 5), 16);
    let b = parseInt(hexColor.substring(5, 7), 16);

    let brightness = 0.299 * r + 0.587 * g + 0.114 * b;

    return brightness > 186 ? '#000000' : '#FFFFFF';
  }

  selected = 'option2';

  navigateToBoard(id: string) {
    this.router.navigate(['/kanban', id]);
  }

  @ViewChild(MatSort) sort!: MatSort;
  private _liveAnnouncer = inject(LiveAnnouncer);

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      const sortedData = [...this.dataSource.data].sort((a, b) => {
        const dateA = a.dueDate ? new Date(a.dueDate).getTime() : null;
        const dateB = b.dueDate ? new Date(b.dueDate).getTime() : null;

        if (dateA === null) return 1;
        if (dateB === null) return -1;

        return sortState.direction === 'asc' ? dateA - dateB : dateB - dateA;
      });

      this.dataSource.data = sortedData;
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this.dataSource.data = this.cards;
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  isOverdue(dueDate: string): boolean {
    if (!dueDate) return false;
    const today = new Date();
    return new Date(dueDate) < today;
  }
}




