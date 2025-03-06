import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanbanNavbarComponent } from './kanban-navbar.component';

describe('KanbanNavbarComponent', () => {
  let component: KanbanNavbarComponent;
  let fixture: ComponentFixture<KanbanNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KanbanNavbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KanbanNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
