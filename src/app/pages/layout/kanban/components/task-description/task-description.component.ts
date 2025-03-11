import {Component, inject, Inject, Input, OnDestroy, OnInit} from '@angular/core';
import {
  MAT_DIALOG_DATA, MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {ListTasksComponent} from '../list-tasks/list-tasks.component';
import {AsyncPipe, DatePipe, NgClass, NgIf, NgStyle} from '@angular/common';
import {MatInput} from '@angular/material/input';
import {CreateTagsComponent} from '../create-tags/create-tags.component';
import {MaterialModule} from '../../../../../shared/modules/material.module';
import {ProgressBarMode} from '@angular/material/progress-bar';
import {Store} from '@ngrx/store';
import {BoardState} from '../../../../../ngrx/board/board.state';
import {LabelState} from '../../../../../ngrx/label/label.state';
import {CardState} from '../../../../../ngrx/card/card.state';
import {UserState} from '../../../../../ngrx/user/user.state';
import {ChecklistItemState} from '../../../../../ngrx/checklistItem/checklistItem.state';
import {CommentState} from '../../../../../ngrx/comment/comment.state';
import {UserService} from '../../../../../services/user/user.service';
import {UserModel} from '../../../../../models/user.model';
import {BehaviorSubject, forkJoin, Observable, Subscription} from 'rxjs';
import {CommentModel} from '../../../../../models/comment.model';
import {CardModel} from '../../../../../models/card.model';
import * as listActions from '../../../../../ngrx/list/list.actions';
import * as cardActions from '../../../../../ngrx/card/card.actions';
import * as labelActions from '../../../../../ngrx/label/label.actions';
import * as checklistItemActions from '../../../../../ngrx/checklistItem/checklistItem.actions';
import * as commentActions from '../../../../../ngrx/comment/comment.actions';
import {UserPipe} from '../../../../../shared/pipes/user.pipe';
import {ListCard} from '../../../../../models/list.model';
import {ListState} from '../../../../../ngrx/list/list.state';

@Component({
  selector: 'app-task-description',
  templateUrl: './task-description.component.html',
  styleUrl: './task-description.component.scss',
  standalone: true,
  imports: [FormsModule, MaterialModule,MaterialModule, MatButtonModule, NgStyle, MatInput, ReactiveFormsModule, MaterialModule, AsyncPipe, UserPipe, DatePipe, NgClass, NgIf]
})
export class TaskDescriptionComponent implements OnInit, OnDestroy{
  newTag = '';
  newSubtask = '';
  newComment = '';
  showAssigneeSelector = false;
  comments: CommentModel[] = [];

  taskUpdatedForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    dueDate: new FormControl<Date | null>(null),
  });

  subTaskForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    isCompleted: new FormControl(false),
    cardId: new FormControl('', [Validators.required]),
  });

  // Create a local task copy that we can modify
  task!: CardModel;

  readonly dialogRef = inject(MatDialogRef<TaskDescriptionComponent>);
  readonly cardId = inject(MAT_DIALOG_DATA);

  // Data for tasks
  currentUser!: string;

  readonly dialog = inject(MatDialog);

  boardId!: string;
  memberIds: string[] = [];
  boardMembers: UserModel[] = [];
  subscriptions: Subscription[] = [];

  completedItems = 0;
  totalItems = 0;

  isGettingCard!: Observable<boolean>;

  ngOnInit() {
    this.subscriptions.push(
      this.store.select('board', 'board').subscribe((board) => {
        if (board) {
          this.boardId = board.id!;
          this.memberIds = board.members!;
        }
      }),
      // this.store
      //   .select('label', 'isGetLabelsInBoardSuccess')
      //   .subscribe((isSuccess) => {
      //     if (isSuccess) {
      //       this.dialog.open(LabelDialogComponent);
      //     }
      //   }),
      this.store.select('comment', 'comments').subscribe((comments) => {
        if (comments) {
          this.comments = comments;
        }
      }),
      this.store.select('card', 'card').subscribe((card) => {
        if (card) {
          console.log(card);
          this.task = card;
          this.completedItems = this.task.checklistItems!.filter(
            (item) => item.isCompleted,
          ).length;
          this.totalItems = this.task.checklistItems!.length;
          this.taskUpdatedForm.setValue({
            id: this.task.id,
            title: this.task.title,
            description: this.task.description,
            dueDate: this.task.dueDate,
          });
          this.subTaskForm.get('cardId')!.setValue(this.task.id);
        }
      }),
      this.store.select('user', 'user').subscribe((user) => {
        this.currentUser = user!.id;
      }),
    );
    this.isGettingCard = this.store.select('card', 'isGettingCard');
    forkJoin(
      this.memberIds.map((id) => this.userSerivce.getUserById(id)),
    ).subscribe((members) => {
      this.boardMembers = members;
    });
  }

  constructor(
    private store: Store<{
      board: BoardState;
      label: LabelState;
      card: CardState;
      user: UserState;
      checklistItem: ChecklistItemState;
      comment: CommentState,
    }>,
    private userSerivce: UserService,
  ) {
    this.store.dispatch(cardActions.getCard({cardId: this.cardId}));
    this.store.dispatch(commentActions.getComment({cardId: this.cardId}));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
    this.subscriptions = [];
  }

  onClose() {
    this.dialogRef.close();
  }

  saveChanges() {
    if (this.taskUpdatedForm.valid) {
      this.store.dispatch(
        cardActions.updateCardDetail({
          card: {
            id: this.taskUpdatedForm.value.id!,
            title: this.taskUpdatedForm.value.title!,
            description: this.taskUpdatedForm.value.description
              ? this.taskUpdatedForm.value.description
              : '',
            dueDate: this.taskUpdatedForm.value.dueDate
              ? this.taskUpdatedForm.value.dueDate
              : null,
          },
        }),
      );
      this.dialogRef.close();
    }
  }

  addTag() {
  }

  removeTag(tag: string) {
  }

  addSubtask() {
    if (this.subTaskForm.valid) {
      this.store.dispatch(
        checklistItemActions.addNewChecklistItem({
          checklistItem: {
            title: this.subTaskForm.value.title!,
            isCompleted: this.subTaskForm.value.isCompleted!,
            cardId: this.subTaskForm.value.cardId!,
          },
        }),
      );
      this.subTaskForm.get('isCompleted')!.setValue(false);
      this.subTaskForm.get('title')!.setValue('');
    }
  }

  removeSubtask(id: string) {
    this.store.dispatch(
      checklistItemActions.deleteChecklistItem({checklistItemId: id}),
    );
  }

  toggleSubtask(completed: boolean, subtaskId: string) {
    // Recalculate completed count safely
    this.store.dispatch(
      checklistItemActions.toggleChecklistItem({
        checklistItem: {
          isCompleted: completed,
          id: subtaskId,
        },
      }),
    );
  }

  getCompletionPercentage(): number {
    if (this.totalItems <= 0) return 0;
    return Math.min(100, (this.completedItems / this.totalItems) * 100);
  }

  addComment() {
    if (this.newComment.trim()) {

      this.store.dispatch(commentActions.createComment({
        comment: {
          cardId: this.task.id!,
          text: this.newComment,
        }
      }));
      this.newComment = '';
    }
  }

  deleteComment(id: string) {
    this.store.dispatch(commentActions.deleteComment({commentId: id}));
  }

  isCurrentUserAuthor(comment: CommentModel): boolean {
    return comment.userId === this.currentUser;
  }

  removeAssignee(memberId: string) {
    this.store.dispatch(
      cardActions.removeMember({
        cardId: this.task.id!,
        userId: memberId,
      }),
    );
    // this.store.dispatch(
    //   notiActions.addAddedToCardUsers({userIds: [memberId]}),
    // );
  }

  openLabelDialog() {
    this.store.dispatch(labelActions.getLabelsInBoard({id: this.boardId}));
  }

  addNewMemberToCard(userId: string) {
    this.store.dispatch(
      cardActions.addNewMember({
        cardId: this.task.id!,
        userId: userId,
      }),
    );
    // this.store.dispatch(notiActions.addAddedToCardUsers({userIds: [userId]}));
  }

  handleCommentKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();

      if (this.newComment.trim()) {
        this.addComment();
      }
    }
  }
}
