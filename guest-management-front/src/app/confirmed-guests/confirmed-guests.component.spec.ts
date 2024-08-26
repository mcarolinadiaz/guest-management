import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmedGuestsComponent } from './confirmed-guests.component';

describe('ConfirmedGuestsComponent', () => {
  let component: ConfirmedGuestsComponent;
  let fixture: ComponentFixture<ConfirmedGuestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmedGuestsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmedGuestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
