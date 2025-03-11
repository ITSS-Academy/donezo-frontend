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
import {GatewayService} from '../../../../../services/gateway/gateway.service';
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
    { name: 'Xanh lá cây', color: '#2ECC71', selected: true },
    { name: 'Đỏ', color: '#E74C3C', selected: false },
    { name: 'Tím', color: '#9B59B6', selected: false },
    { name: 'Xanh dương', color: '#3498DB', selected: false },
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
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.store.select('label', 'labels').subscribe((labels) => {
        if (labels) {
          // Lấy danh sách nhãn từ store với selected bằng cái đầu tiên
          this.labels = labels.map((label, index) => {
            return {
              id: label.id!,
              name: label.name!,
              color: label.color!,
              selected: index === 0,
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
        }
      }),
      this.store
        .select('label', 'isAddLabelToTaskSuccess')
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
    this.store.dispatch(
      labelActions.addLabelToTask({
        taskId: this.cardId,
        labelIds: this.selectionColor.selectedOptions.selected.map(
          (option) => option.value.id,
        ),
      }),
    );
  }
}
