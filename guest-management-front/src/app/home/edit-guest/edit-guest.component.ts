import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { GuestsService } from '../../service/guests.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-edit-guest',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-guest.component.html',
  styleUrl: './edit-guest.component.scss'
})
export class EditGuestComponent implements OnInit {
  guest!: any;
  id!: any;
  editForm: FormGroup;
  successMessage = '';
  errorMessage = '';

  constructor(private route: ActivatedRoute, 
    private guestsService: GuestsService,
    private fb: FormBuilder,
    private location: Location) {
      this.editForm = this.fb.group({
        inputName: ['', [Validators.required, Validators.minLength(2)]],  // Nombre
        inputLastname: ['', [Validators.required, Validators.minLength(2)]],  // Apellido
        grCarne: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],  // Gramos de carne (solo números)
        inputLettuce: [false],  // Checkbox de lechuga
        inputTomato: [false],   // Checkbox de tomate
        inputOnion: [false]     // Checkbox de cebolla
      });
    }

  ngOnInit(): void {
    this.route.params?.subscribe((params: Params) => {
      if (params && params['id']) {
        this.id = params['id'];
        this.guestsService.getGuestById(this.id).subscribe((guest: any) => {
          this.guest = {};
          if (guest) {
            this.guest.id = this.id;
            this.guest.userName = guest.userName;
            this.guest.meat = guest.meat;
            this.guest.salad = guest.salad;
            this.guest.confirmation = guest.confirmation;
          }
          this.initForm(guest);
        });
      }
    });
  }
  

  initForm(guest: any) {
    this.editForm = this.fb.group({
      inputName: [guest ? guest.userName.split(' ')[0] : '', [Validators.required, Validators.minLength(2)]],  // Nombre
      inputLastname: [guest ? guest.userName.split(' ')[1] : '', [Validators.required, Validators.minLength(2)]],  // Apellido
      grCarne: [guest ? guest.meat : '', [Validators.required, Validators.pattern('^[0-9]+$')]],  // Gramos de carne (solo números)
      inputLettuce: [guest ? Array(guest.salad).includes('lechuga') : false],  // Checkbox de lechuga
      inputTomato: [guest ? guest.salad.includes('tomate') : false],   // Checkbox de tomate
      inputOnion: [guest ? guest.salad.includes('cebolla') : false]     // Checkbox de cebolla
    });
  }

  onSubmit() {
    if (this.editForm.valid) {
      // Procesa los datos del formulario
      let salad = new Array();
      if (this.editForm.value.inputLettuce) {
        salad.push('lechuga');
      }
      if (this.editForm.value.inputTomato) {
        salad.push('tomate');
      }
      if (this.editForm.value.inputOnion) {
        salad.push('cebolla');
      }
      let payload = {
        userName: this.editForm.value.inputName + ' ' + this.editForm.value.inputLastname,
        confirmation: this.guest ? this.guest.confirmation : false,
        meat: this.editForm.value.grCarne,
        salad: salad
      }
      // Si hubo un id pasado por parametro, se llama a editGuest
      if (this.id) {
        // Editar invitado existente
        this.guestsService.editGuest(this.id, payload).subscribe({
          next: () => {
            this.successMessage = 'Edición exitosa';
            setTimeout(() => this.location.back(), 1500);
          },
          error: (err) => {
            this.errorMessage = 'Error en la edición: ' + err.message;
          }
        });
      } else {
        // Crear nuevo invitado
        this.guestsService.createGuest(payload).subscribe({
          next: () => {
            this.successMessage = 'Creación exitosa';
            setTimeout(() => this.location.back(), 1500);
          },
          error: (err) => {
            this.errorMessage = 'Error en la creación: ' + err.message;
          }
        });
      }
    } else {
      console.log('Formulario inválido');
    }
  }

  onCancel() {
    this.location.back(); // Navega hacia atrás en el historial del navegador
  }
}
