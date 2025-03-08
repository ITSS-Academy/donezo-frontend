import { Component } from '@angular/core';

import {MaterialModule} from '../../../../../shared/modules/material.module';

@Component({
  selector: 'app-add-members',
  standalone: true,
  imports: [
    MaterialModule
  ],
  templateUrl: './members.component.html',
  styleUrl: './members.component.scss'
})
export class MembersComponent {

}


