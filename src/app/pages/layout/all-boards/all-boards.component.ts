import {CreateTagComponent} from '../../../components/create-tag/create-tag.component';
import { Component } from '@angular/core';
import { MaterialModule } from '../../../shared/modules/material.module';

@Component({
  selector: 'app-all-boards',
  standalone: true,
  imports: [
    CreateTagComponent,
    MaterialModule
  ],
  templateUrl: './all-boards.component.html',
  styleUrl: './all-boards.component.scss'
})
export class AllBoardsComponent {

}
