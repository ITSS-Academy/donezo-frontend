import {Component, model} from '@angular/core';
import {MatCardContent} from "@angular/material/card";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {FormsModule} from '@angular/forms';
import {UserModel} from '../../../../../models/user.model';
import {ChecklistItemModel} from '../../../../../models/checklistItem.model';


@Component({
  selector: 'app-filter-kanban',
  standalone: true,
  imports: [
    MatCardContent,
    MatCheckbox,
    MatFormField,
    MatInput,
    MatRadioButton,
    MatRadioGroup,
    FormsModule
  ],
  templateUrl: './filter-kanban.component.html',
  styleUrl: './filter-kanban.component.scss'
})
export class FilterKanbanComponent {
  readonly checked = model(false);
  readonly indeterminate = model(false);
  readonly labelPosition = model<'before' | 'after'>('after');
  readonly disabled = model(false);

  assignees: UserModel[] = [
    {
      id: '1',
      email: 'so1@gmail.com',
      name: 'TuHao',
      photoUrl: 'https://static.tuoitre.vn/tto/i/s626/2014/07/04/ACO1WI1F.jpg',
      createdAt: new Date(),
    },

    {
      id: '2',
      email: 'so2@gmail.com',
      name: 'Bodu',
      photoUrl: 'https://i.vietgiaitri.com/2021/10/26/bi-phat-cun-cung-bat-che-do-dien-sau-lam-chu-phai-chao-thua-cd0-6118248.png',
      createdAt: new Date(),
    },
    {
      id: '1',
      email: 'so3@gmail.com',
      name: 'HwngLe',
      photoUrl: 'https://cdn11.dienmaycholon.vn/filewebdmclnew/public/userupload/files/Image%20FP_2024/hinh-anime-2.jpg',
      createdAt: new Date(),
    }
  ];
  checklistItems: ChecklistItemModel[] = [
    {
      id: '1',
      title: 'Task 1',
    },
    {
      id: '2',
      title: 'Task 2',
    },
    {
      id: '3',
      title: 'Task 3',
    }
  ];
}
