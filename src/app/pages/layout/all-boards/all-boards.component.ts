import { CreateTagsComponent } from '../kanban/components/create-tags/create-tags.component';
import { Component } from '@angular/core';
import { MaterialModule } from '../../../shared/modules/material.module';

@Component({
  selector: 'app-all-boards',
  standalone: true,
  imports: [
    CreateTagsComponent,
    MaterialModule,
  ],
  templateUrl: './all-boards.component.html',
  styleUrl: './all-boards.component.scss'
})
export class AllBoardsComponent {

}
