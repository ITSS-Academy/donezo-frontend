import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MaterialModule} from '../../shared/modules/material.module';
import {BehaviorSubject, debounceTime, map, Observable, startWith, Subscription} from 'rxjs';
import {UserModel} from '../../models/user.model';
import {Store} from '@ngrx/store';
import {AsyncPipe} from '@angular/common';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {user} from '@angular/fire/auth';
import {BoardState} from '../../ngrx/board/board.state';
import {Router} from '@angular/router';
import {BackgroundPipe} from '../../shared/pipes/background.pipe';
import {BoardModel} from '../../models/board.model';
// import firebase from 'firebase/compat';
import * as boardActions from '../../ngrx/board/board.actions';

export interface User {
  name: string;
}

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    // MatIcon,
    MatFormField,
    MaterialModule,
    AsyncPipe,
    ReactiveFormsModule,
    BackgroundPipe
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit, OnDestroy {
  myControl = new FormControl<string | User>('');
  options: User[] = [{name: 'All Board'}, {name: 'All tasks'}, {name: 'Personal'}, {name: ' trip to  japan '}];
  filteredOptions: Observable<User[]> | undefined;

  @Output() onToggleDrawer = new EventEmitter<string>();

  searchSubject = new BehaviorSubject('');
  searchItems$ = this.searchSubject.asObservable();

  subscriptions: Subscription[] = [];

  ngOnInit() {
    this.subscriptions.push(
      this.searchItems$.pipe(
        debounceTime(500),
      ).subscribe((search) => {
        if (search) {
          this.store.dispatch(boardActions.searchBoards({search}));
        }
      }),
      this.store.select('board', 'searchedBoards').subscribe((searchResults) => {
        if (searchResults) {
          console.log('Search results:', searchResults);
          this.boardItems = searchResults;
        }
      })
    );
  }

  ngOnDestroy() {
    this.store.dispatch(boardActions.clearSearchBoards());
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  boardItems!: BoardModel[];

  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }

  constructor(private store: Store<{ board: BoardState }>,
              private router: Router) {

  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  protected readonly user = user;
  protected readonly name = name;


  navigateToBoard(id: string | undefined) {
    this.router.navigate(['/kanban', id]).then(r => console.log(r));
    this.onToggleDrawer.emit('search');
    
  }

  search($event: Event) {
    const target = $event.target as HTMLInputElement;
    console.log('Searching for:', target.value);
    this.searchSubject.next(target.value);

  }
}
