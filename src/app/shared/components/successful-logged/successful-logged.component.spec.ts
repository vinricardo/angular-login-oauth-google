import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessfulLoggedComponent } from './successful-logged.component';

describe('SuccessfulLoggedComponent', () => {
  let component: SuccessfulLoggedComponent;
  let fixture: ComponentFixture<SuccessfulLoggedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessfulLoggedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessfulLoggedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
