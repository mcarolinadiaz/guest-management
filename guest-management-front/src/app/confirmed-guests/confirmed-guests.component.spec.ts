import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { ConfirmedGuestsComponent } from './confirmed-guests.component';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { GuestsService } from '../service/guests.service';

// Mocks
const mockGuestsService = {
  getGuests: jasmine.createSpy('getGuests').and.returnValue(of([
    { id: 1, userName: 'Mariana Blanca', meat: 300, salad: ["tomate"], confirmation: true },
    { id: 2, userName: 'Marcelo Franco', meat: 250, salad: [], confirmation: false }
  ])),
  calculatePrice: jasmine.createSpy('calculatePrice').and.returnValue(30)
};

const mockActivatedRoute = {
  queryParams: of({ search: 'Maria' })  // Simula los parámetros de consulta
};

describe('ConfirmedGuestsComponent', () => {
  let component: ConfirmedGuestsComponent;
  let fixture: ComponentFixture<ConfirmedGuestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmedGuestsComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: GuestsService, useValue: mockGuestsService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmedGuestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch confirmed guests on initialization', () => {
    expect(mockGuestsService.getGuests).toHaveBeenCalled();
    expect(component.guests).toBeDefined();
    expect(component.guests.length).toBe(1);  // Solo 1 invitado tiene confirmation en true
    expect(component.guests[0].userName).toBe('Mariana Blanca');
  });

  it('should filter guests based on search term', () => {
    component.getConfirmedGuests('Maria');
    fixture.detectChanges();
    expect(component.guests.length).toBe(1);  // Solo "Mariana Blanca" debería coincidir
  });

  // Se utiliza fakeAsync para simular respuesta asyncrona
  it('should show success message and hide after 3 seconds', fakeAsync(() => {
    component.setSuccessMessage('Operation successful');
    expect(component.showSuccessMessage).toBeTrue();
    expect(component.message).toBe('Operation successful');

    tick(3000); 
    fixture.detectChanges(); 

    expect(component.showSuccessMessage).toBeFalse();
  }));
});
