import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeschoolDetailComponent } from './homeschool-detail.component';

describe('HomeschoolDetailComponent', () => {
  let component: HomeschoolDetailComponent;
  let fixture: ComponentFixture<HomeschoolDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeschoolDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeschoolDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
