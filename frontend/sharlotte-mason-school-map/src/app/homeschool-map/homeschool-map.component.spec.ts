import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeschoolMapComponent } from './homeschool-map.component';

describe('HomeschoolMapComponent', () => {
  let component: HomeschoolMapComponent;
  let fixture: ComponentFixture<HomeschoolMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeschoolMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeschoolMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
