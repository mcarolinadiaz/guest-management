import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import { Router } from '@angular/router';
import { GuestsService } from '../service/guests.service';
import { of } from 'rxjs';

// Mocks
const mockRouter = {
  navigate: jasmine.createSpy('navigate')
};
// Mock de servicio para simular la respuesta
const mockGuestsService = {
  getGuestById: jasmine.createSpy('getGuestById').and.returnValue(of({})),
  updateConfirmation: jasmine.createSpy('updateConfirmation').and.returnValue(of({}))
};

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: GuestsService, useValue: mockGuestsService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    component.guest = { id: 1, userName: 'Test User', salad: ["tomate", "lechuga"] }; // Mock guest data
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return true', () => {
    const result = component.isFirstAndNotUnique(0);
    expect(result).toBeTrue();
  });

  it('should navigate to edit-guest', () => {
    mockGuestsService.getGuestById.and.returnValue(of({ id: 1 }));
    // Realiza la llamada al metodo del componente
    component.onEditGuest();
    expect(mockGuestsService.getGuestById).toHaveBeenCalledWith(1);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['edit-guest', 1]);
  });

  it('should emit successMessage', () => {
    const spyEmit = spyOn(component.successMessage, 'emit');
    mockGuestsService.updateConfirmation.and.returnValue(of({ userName: 'Test User' }));
    // Hace la llamada al metodo del componente
    component.onUpdateConfirmation(true);
    expect(mockGuestsService.updateConfirmation).toHaveBeenCalledWith(1, true);
    expect(spyEmit).toHaveBeenCalledWith('Cambio de confirmación del invitado Test User.');
  });
});
