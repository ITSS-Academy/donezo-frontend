import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterKanbanComponent } from './filter-kanban.component';

describe('FilterKanbanComponent', () => {
  let component: FilterKanbanComponent;
  let fixture: ComponentFixture<FilterKanbanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterKanbanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterKanbanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
