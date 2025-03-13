import {Component, inject, ViewChild} from '@angular/core';
import {MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatDialog, MatDialogActions, MatDialogContent, MatDialogRef} from '@angular/material/dialog';
import {CreateTagsComponent} from '../create-tags/create-tags.component';
import {MatListOption, MatSelectionList} from '@angular/material/list';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {LabelState} from '../../../../../ngrx/label/label.state';
import {BoardState} from '../../../../../ngrx/board/board.state';
import {CardState} from '../../../../../ngrx/card/card.state';
import {ListState} from '../../../../../ngrx/list/list.state';
import * as labelActions from '../../../../../ngrx/label/label.actions';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgStyle} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {MaterialModule} from '../../../../../shared/modules/material.module';

interface Label {
  id?: string;
  name: string;
  color: string;
  selected: boolean;
}


@Component({
  selector: 'app-label',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatDialogActions,
    MatSelectionList,
    MatListOption,
    MatDialogContent,
    FormsModule,
    NgStyle,
    NgForOf,
    MaterialModule,
    MatIcon
  ],
  templateUrl: './label.component.html',
  styleUrl: './label.component.scss'
})
export class LabelComponent {
  readonly labelRef = inject(MatDialogRef<CreateTagsComponent>);
  private dialog = inject(MatDialog); // Inject MatDialog để mở dialog mới

  @ViewChild('selectionColor') selectionColor!: MatSelectionList;

  searchText = '';
  labels: Label[] = [
    {name: 'Xanh lá cây', color: '#2ECC71', selected: true},
    {name: 'Đỏ', color: '#E74C3C', selected: false},
    {name: 'Tím', color: '#9B59B6', selected: false},
    {name: 'Xanh dương', color: '#3498DB', selected: false},
  ];

  subscriptions: Subscription[] = [];
  boardId!: string;
  cardId!: string;

  constructor(
    public dialogRef: MatDialogRef<CreateTagsComponent>,
    private store: Store<{
      label: LabelState;
      board: BoardState;
      card: CardState;
      list: ListState;
    }>,
  ) {
  }

  cardLabels: Label[] = [];

  ngOnInit() {
    this.subscriptions.push(
      this.store.select('label', 'labels').subscribe((labels) => {
        if (labels) {
          this.labels = labels.map((label, index) => {
            return {
              id: label.id!,
              name: label.name!,
              color: label.color!,
              selected: false,
            };
          });
        }
      }),
      this.store.select('board', 'board').subscribe((board) => {
        if (board) {
          this.boardId = board.id!;
        }
      }),
      this.store.select('card', 'card').subscribe((card) => {
        if (card) {
          this.cardId = card.id!;
          this.labels = this.labels
            ? this.labels.map((label) => {
              return {
                ...label,
                selected:
                  card.labels?.findIndex(
                    (cardLabel) => cardLabel.id === label.id,
                  ) !== -1,
              };
            })
            : [];
        }
      }),
      this.store
        .select('label', 'isUpdateLabelSuccess')
        .subscribe((isAddLabelToTaskSuccess) => {
          if (isAddLabelToTaskSuccess) {
            this.dialogRef.close();
          }
        }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this.subscriptions = [];
    this.store.dispatch(labelActions.clearLabelState());
  }

  filteredLabels() {
    return this.labels.filter((label) =>
      label.name.toLowerCase().includes(this.searchText.toLowerCase()),
    );
  }

  // ✅ Mở label-list khi nhấn "Tạo nhãn mới"
  createNewLabel() {
    this.dialog.open(CreateTagsComponent, {
      width: '400px',
    });
  }

  editLabel(label: Label) {
    console.log('Chỉnh sửa nhãn:', label);
  }

  addLabelsToCard() {
    console.log(
      'Thêm nhãn:',
      this.selectionColor.selectedOptions.selected.map(
        (option) => option.value.id,
      ),
    );
    console.log(this.labels);
    // tìm ra sự thay đổi trong mảng label
    const selectedLabelIds = this.selectionColor.selectedOptions.selected.map(
      (option) => option.value.id,
    );

    const addedLabels = this.labels.filter(
      (label) => selectedLabelIds.includes(label.id) && !label.selected,
    );

    const removedLabels = this.labels.filter(
      (label) => !selectedLabelIds.includes(label.id) && label.selected,
    );

    //so sánh mảng label đã chọn và mảng label đã có để thêm hoặc xóa nhãn
    this.labels = this.labels.map((label) => ({
      ...label,
      selected: selectedLabelIds.includes(label.id),
    }));

    console.log('Nhãn được thêm:', addedLabels);
    console.log('Nhãn được xóa:', removedLabels);

    if (addedLabels.length === 0 && removedLabels.length === 0) {
      return;
    }
    if (addedLabels.length > 0) {
      this.store.dispatch(
        labelActions.addLabelToTask({
          taskId: this.cardId,
          labelIds: addedLabels.map((label) => label.id!),
        }),
      );
    }
    if (removedLabels.length > 0) {
      this.store.dispatch(
        labelActions.removeLabelFromTask({
          taskId: this.cardId,
          labelIds: removedLabels.map((label) => label.id!),
        }),
      );
    }
  }

  deleteLabel(labelToDelete: any) {
    if (confirm(`Are you sure you want to delete label "${labelToDelete.name}"?`)) {
      this.labels = this.labels.filter(label => label !== labelToDelete);
      if (labelToDelete.id) {
        this.store.dispatch(labelActions.deleteLabel({labelId: labelToDelete.id}));
      }
    }
  }
}
