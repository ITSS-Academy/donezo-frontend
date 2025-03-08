import {Component, ElementRef, inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ListTasksComponent} from "./components/list-tasks/list-tasks.component";
import {MembersComponent} from './components/add-members/members.component';
import {CreateTagsComponent} from './components/create-tags/create-tags.component';
import {KanbanNavbarComponent} from './components/kanban-navbar/kanban-navbar.component';
import {ActivatedRoute} from '@angular/router';
import * as listActions from '../../../ngrx/list/list.actions';
import {Observable, Subscription} from 'rxjs';
import {BoardModel} from '../../../models/board.model';
import {ListModel} from '../../../models/list.model';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {BoardState} from '../../../ngrx/board/board.state';
import {ListState} from '../../../ngrx/list/list.state';
import {
  CdkDrag,
  CdkDragDrop, CdkDragHandle,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatFormField} from '@angular/material/form-field';
import {MatIcon} from '@angular/material/icon';
import {MatInput} from '@angular/material/input';
import {MatDialog} from '@angular/material/dialog';
import {TaskComponent} from './components/list-tasks/components/task/task.component';
import {NgStyle} from '@angular/common';
import {TaskDescriptionComponent} from './components/task-description/task-description.component';

@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [ListTasksComponent, KanbanNavbarComponent, CdkDrag, CdkDropList, MatButton, MatFormField, MatIcon, MatIconButton, MatInput, ReactiveFormsModule, FormsModule, NgStyle, CdkDropListGroup, CdkDragHandle],
  templateUrl: './kanban.component.html',
  styleUrl: './kanban.component.scss'
})
export class KanbanComponent implements OnInit, OnDestroy {

  protected readonly open = open;
  board$!: Observable<BoardModel | null>;
  lists: (ListModel & { isInEditMode?: boolean })[] = [];
  boardId!: string;
  isAddingList = false;


  openTagsDialog(): void {
    const dialogRef = this.dialog.open(CreateTagsComponent, {
      data: {},
      width: 'fit-content'
    });
  }


  protected readonly MembersComponent = MembersComponent;
  protected readonly CreateTagsComponent = CreateTagsComponent;

  cardName = new FormControl('', [Validators.required]);
  listName = new FormControl('', [Validators.required]);

  subscriptions: Subscription[] = [];

  columns!: ListModel[]

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<{
      board: BoardState;
      list: ListState;
    }>,
    public dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.activatedRoute.params.subscribe((params) => {
        const newBoardId = params['id'];
        this.boardId = newBoardId;
        this.subscriptions.forEach((sub) => sub.unsubscribe());
        this.subscriptions = [];
        this.store.dispatch(listActions.clearListStore());
        this.store.dispatch(listActions.getLists({boardId: newBoardId}))

      }),


      this.store.select('list', 'lists').subscribe((lists) => {
        console.log(lists);
        this.lists = lists;
      }),
    )
    this.board$ = this.store.select('board', 'board');

  }

  addTask(listId: string) {
    this.list.isInEditMode = true;
    // find in lists, then switch isInEditMode to true
    this.lists = this.lists.map((list) => {
      if (list.id === listId) {
        return {...list, isInEditMode: true};
      }
      if (list.isInEditMode) {
        this.cardName.reset();
        return {...list, isInEditMode: false};
      }
      return list;
    });
  }

  addNewList() {
    if (this.listName.valid) {
      this.store.dispatch(
        listActions.addNewList({
          listName: this.listName.value!,
          boardId: this.boardId,
        }),
      );
      this.listName.reset();
    }
  }

  onColumnDrop($event: CdkDragDrop<any>) {
    console.log($event);
    if (
      $event.previousContainer === $event.container &&
      Array.isArray(this.lists)
    ) {
      const updatedColumns = this.lists.map((col) => ({
        ...col,
        cards: col.cards ? [...col.cards] : [],
      }));
      moveItemInArray(
        updatedColumns,
        $event.previousIndex,
        $event.currentIndex,
      );
      this.lists = updatedColumns;
    } else {
      transferArrayItem(
        $event.previousContainer.data,
        $event.container.data,
        $event.previousIndex,
        $event.currentIndex,
      );
    }
    console.log(this.lists);
    this.store.dispatch(
      listActions.updatePosition({
        list: this.lists,
        boardId: this.boardId,
      }),
    );
  }

  onCardDrop(event: CdkDragDrop<any[], any>) {
    console.log(event);
    console.log('888888888888888888888888888888888888888888888888')

    //get list Index
    const previousIndex = parseInt(event.previousContainer.id);
    const currentIndex = parseInt(event.container.id);

    console.log(
      this.lists[previousIndex].cards![event.previousIndex].id,
      this.lists[currentIndex]!.id!,
      Number(event.currentIndex),
    );

    this.store.dispatch(
      listActions.updateCard({
        cardId: this.lists[previousIndex].cards![event.previousIndex].id!,
        listId: this.lists[currentIndex]!.id!,
        cardPosition: Number(event.currentIndex),
      }),
    );

    if (event.previousContainer === event.container) {
      if (this.lists && this.lists[previousIndex].cards) {
        console.log(this.lists[previousIndex]);
        const updatedColumns = [
          ...this.lists[previousIndex].cards.map((card: any) => ({...card})),
        ];
        moveItemInArray(
          updatedColumns,
          event.previousIndex,
          event.currentIndex,
        );
        this.lists = this.lists.map((col, index) => {
          if (index === previousIndex) {
            return {...col, cards: [...updatedColumns]};
          }
          return col;
        });
      }
    } else {
      const previousContainer = [
        ...event.previousContainer.data.map((item: any) => ({...item})),
      ];
      console.log(event.container!.data);
      const container = [
        ...event.container!.data!.map((item: any) => ({...item})),
      ];
      transferArrayItem(
        previousContainer,
        container,
        event.previousIndex,
        event.currentIndex,
      );

      this.lists = this.lists.map((col, index) => {
        if (index === previousIndex) {
          return {...col, cards: [...previousContainer]};
        }
        if (index === currentIndex) {
          return {...col, cards: [...container]};
        }
        return col;
      });
    }

    console.log(this.lists[previousIndex]);
    console.log(this.lists[currentIndex]);
  }

  indexToString(index: number): string {
    return index.toString();
  }

  createNewTask(listId: string) {
    if (this.cardName.errors) {
      return;
    }
    this.store.dispatch(
      listActions.addCard({card: this.cardName.value!, listId}),
    );
    this.cardName.reset();
    this.lists = this.lists.map((list) => {
      if (list.id === listId) {
        return {...list, isInEditMode: false};
      }
      return list;
    });
  }

  cancelEdit(listId: string) {
    this.list.isInEditMode = false;
    this.lists = this.lists.map((list) => {
      if (list.id === listId) {
        return {...list, isInEditMode: false};
      }
      return list;
    });
  }

  onEnterPress(event: any, listId: string) {
    if (event.keyCode === 13) {
      this.createNewTask(listId);
    }
  }

  ngOnDestroy() {
    console.log('destroy');
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this.store.dispatch(listActions.clearListStore());
  }

  cancelAddList() {
    this.isAddingList = false;
  }

  onBtnAddList() {
    this.isAddingList = true;
  }

  removeList(listId: string) {
    this.store.dispatch(listActions.deleteList({listId}));
  }

  @ViewChild('columnInput') columnInput!: ElementRef;
  @ViewChild('taskInput') taskInput!: ElementRef;

  list = {isInEditMode: false}; // Simulated list object, replace with actual logic

  ngAfterViewChecked() {
    if (this.isAddingList && this.columnInput) {
      setTimeout(() => this.columnInput.nativeElement.focus(), 0);
    }

    // if (this.list.isInEditMode && this.taskInput) {
    //   setTimeout(() => this.taskInput.nativeElement.focus(), 0);
    // }
  }

  showColumnInput = false;


  get dropListIds() {
    return this.columns.map(column => column.id);
  }

  dropColumn(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
  }

  dropCard(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }

  openDialog(columnId: any): void {
    const dialogRef = this.dialog.open(TaskComponent, {
      width: '300px',
      data: columnId
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result && typeof result === 'string' && result.trim()) {
    //     column.tasks.push({
    //       title: result.trim(),
    //       time: new Date().toLocaleDateString(),
    //       tags: [],
    //       members: [],
    //       comments: 0,
    //       attachments: 0,
    //       checklist: {completed: 0, total: 0}
    //     });
    //   }
    // });
  }


  descriptionDialog = inject(MatDialog);

  openDescriptionDialog(data: any): void {
    this.descriptionDialog.open(TaskDescriptionComponent, {
      data: data
    });
  }


  deleteTask(cardId: string): void {
    this.store.dispatch(listActions.deleteCard({cardId: cardId}));
  }


  protected readonly TaskDescriptionComponent = TaskDescriptionComponent;
  value = '';
}
