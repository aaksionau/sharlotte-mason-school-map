import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeschoolListComponent } from './homeschool-list.component';

describe('HomeschoolListComponent', () => {
  let component: HomeschoolListComponent;
  let fixture: ComponentFixture<HomeschoolListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeschoolListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeschoolListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
