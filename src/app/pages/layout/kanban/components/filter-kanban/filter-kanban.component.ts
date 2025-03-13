import {Component, model, signal} from '@angular/core';
import {MatCardContent} from "@angular/material/card";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormsModule} from '@angular/forms';
import {UserModel} from '../../../../../models/user.model';
import {ChecklistItemModel} from '../../../../../models/checklistItem.model';
import {Store} from '@ngrx/store';
import {BoardState} from '../../../../../ngrx/board/board.state';
import {LabelState} from '../../../../../ngrx/label/label.state';
import {ListState} from '../../../../../ngrx/list/list.state';
import {Subscription} from 'rxjs';
import {LabelModel} from '../../../../../models/label.model';
import * as listActions from '../../../../../ngrx/list/list.actions';
import * as labelActions from '../../../../../ngrx/label/label.actions';
import {MaterialModule} from '../../../../../shared/modules/material.module';
import {AsyncPipe} from '@angular/common';
import {UserPipe} from '../../../../../shared/pipes/user.pipe';


@Component({
  selector: 'app-filter-kanban',
  standalone: true,
  imports: [
    MatCheckbox,
    MaterialModule,
    FormsModule,
    AsyncPipe,
    UserPipe
  ],
  templateUrl: './filter-kanban.component.html',
  styleUrl: './filter-kanban.component.scss'
})
export class FilterKanbanComponent {
  members = signal<
    | {
    id: string;
    isChecked: boolean;
  }[]
    | null
  >(null);

  tags = signal<
    | {
    id: string;
    name: string;
    color: string;
    isChecked: boolean;
  }[]
    | null
  >(null);

  constructor(
    private store: Store<{
      board: BoardState;
      label: LabelState;
      list: ListState;
    }>,
  ) {
  }

  boardId!: string;
  subscriptions: Subscription[] = [];

  filteringMembers: string[] = [];
  filteringTags: string[] = [];

  ngOnInit() {
    this.subscriptions.push(
      this.store.select('list', 'isFiltering').subscribe((isFiltering) => {
        if (!isFiltering) {
          this.members()?.map((member) => {
            member.isChecked = false;
          });
          this.tags()?.map((tag) => {
            tag.isChecked = false;
          });
        }
      }),
      this.store.select('board', 'board').subscribe((board) => {
        if (board) {
          this.members.set(
            board.members!.map((member) => {
              return {
                id: member,
                isChecked: false,
              };
            }),
          );
          this.boardId = board.id!;
        }
      }),
      this.store.select('label', 'labels').subscribe((labels) => {
        if (labels) {
          this.tags.set(
            labels.map((label: LabelModel) => {
              return {
                id: label.id!,
                name: label.name!,
                color: label.color!,
                isChecked: false,
              };
            }),
          );
        }
      }),
      this.store.select('list', 'filterMembers').subscribe((members) => {
        this.filteringMembers = members;
        this.members()?.map((member) => {
          member.isChecked = this.filteringMembers.includes(member.id);
        });
      }),
      this.store.select('list', 'filterLabels').subscribe((tags) => {
        this.filteringTags = tags;
        this.tags()?.map((tag) => {
          tag.isChecked = this.filteringTags.includes(tag.id);
        });
      }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this.store.dispatch(labelActions.clearLabelState());
  }

  update(completed: boolean, memberId: string) {
    if (completed) {
      this.store.dispatch(
        listActions.addMemberIdToFilterArray({userId: memberId}),
      );
    } else {
      this.store.dispatch(
        listActions.removeUserIdFromFilterArray({userId: memberId}),
      );
    }

    this.members()?.map((member) => {
      if (member.id === memberId) {
        member.isChecked = completed;
      }
    });

    this.store.dispatch(
      listActions.checkIsFiltering({isFiltering: !this.isFilterDisabled()}),
    );
    console.log(this.isFilterDisabled());
    if (!this.isFilterDisabled()) {
      this.filter();
    }
  }

  updateTags(completed: boolean, tagId: string) {
    if (completed) {
      this.store.dispatch(
        listActions.addLabelIdToFilterArray({labelId: tagId}),
      );
    } else {
      this.store.dispatch(
        listActions.removeLabelIdFromFilterArray({labelId: tagId}),
      );
    }
    this.tags()?.map((tag) => {
      if (tag.id === tagId) {
        tag.isChecked = completed;
      }
    });
    this.store.dispatch(
      listActions.checkIsFiltering({isFiltering: !this.isFilterDisabled()}),
    );
    if (!this.isFilterDisabled()) {
      this.filter();
    }
  }

  isFilterDisabled() {
    return (
      this.members()?.every((member) => !member.isChecked) &&
      this.tags()?.every((tag) => !tag.isChecked)
    );
  }

  filter() {
    const memberIds = this.members()
      ?.filter((member) => member.isChecked)
      .map((member) => member.id);
    const tagIds = this.tags()
      ?.filter((tag) => tag.isChecked)
      .map((tag) => tag.id);
    this.store.dispatch(
      listActions.getFilteredCards({
        userIds: memberIds!,
        labels: tagIds!,
        boardId: this.boardId,
      }),
    );
  }

  clearFilter() {
    this.store.dispatch(listActions.clearFilterArrays());
  }
}
