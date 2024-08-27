import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { EditGuestComponent } from './edit-guest.component';
import { of } from 'rxjs';
import { GuestsService } from '../../service/guests.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Location } from '@angular/common';

// Mocks
const mockGuestsService = {
  getGuestById: jasmine.createSpy('getGuestById').and.returnValue(of({
    id: 1,
    userName: 'Juana Díaz',
    meat: 300,
    salad: [],
    confirmation: true
  })),
  editGuest: jasmine.createSpy('editGuest').and.returnValue(of({})),
  createGuest: jasmine.createSpy('createGuest').and.returnValue(of({}))
};

const mockActivatedRoute = {
  params: of({ id: 1 }) 
};

const mockLocation = {
  back: jasmine.createSpy('back')
};

describe('EditGuestComponent', () => {
  let component: EditGuestComponent;
  let fixture: ComponentFixture<EditGuestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, EditGuestComponent],
      providers: [
        { provide: GuestsService, useValue: mockGuestsService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Location, useValue: mockLocation },
        FormBuilder
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Verifica que se obtenga el invitado por id específico
  it('should load guest data on initialization', fakeAsync(() => {
    component.ngOnInit();
    tick(); 
    fixture.detectChanges();

    expect(mockGuestsService.getGuestById).toHaveBeenCalledWith(1);
    expect(component.editForm.value).toEqual({
      inputName: 'Juana',
      inputLastname: 'Díaz',
      grCarne: 300,
      inputLettuce: false,
      inputTomato: false,
      inputOnion: false
    });
  }));

  // Verifica que se inicializa el formulario correctamente
  it('should initialize form correctly', () => {
    // Mock de datos de invitado
    const guest = {
      userName: 'Maria Pereira',
      meat: 250,
      salad: ["tomate"],
      confirmation: true
    };
    component.initForm(guest);
    expect(component.editForm.value).toEqual({
      inputName: 'Maria',
      inputLastname: 'Pereira',
      grCarne: 250,
      inputLettuce: false,
      inputTomato: true,
      inputOnion: false
    });
  });

  // Simula que se completa correctamente el formulario y luego se vuelve hacia atrás en la navegación
  it('should submit form successfully and navigate back', fakeAsync(() => {
    component.editForm.setValue({
      inputName: 'Carlos',
      inputLastname: 'Gomez',
      grCarne: 200,
      inputLettuce: false,
      inputTomato: false,
      inputOnion: false
    });
    component.onSubmit();
    tick(1500);  
    fixture.detectChanges();
    expect(mockGuestsService.editGuest).toHaveBeenCalledWith(1, {
      userName: 'Carlos Gomez',
      confirmation: true,
      meat: 200,
      salad: []
    });
    expect(component.successMessage).toBe('Edición exitosa');
    expect(mockLocation.back).toHaveBeenCalled();
  }));
});
