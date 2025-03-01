import {Component, model} from '@angular/core';
import {MatCard, MatCardContent} from '@angular/material/card';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import {FormsModule} from '@angular/forms';
import {MatFormField, MatInput} from '@angular/material/input';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    MatCardContent,
    MatCard,
    MatCheckbox,
    MatRadioGroup,
    MatRadioButton,
    FormsModule,
    MatInput,
    MatFormField
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {
  readonly checked = model(false);
  readonly indeterminate = model(false);
  readonly labelPosition = model<'before' | 'after'>('after');
  readonly disabled = model(false);
}
