import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { GuestsService } from '../../service/guests.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

  constructor(private route: ActivatedRoute, 
    private guestsService: GuestsService,
    private fb: FormBuilder) {
      this.editForm = this.fb.group({
        inputName: ['', [Validators.required, Validators.minLength(2)]],  // Nombre
        inputLastname: ['', [Validators.required, Validators.minLength(2)]],  // Apellido
        grCarne: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]  // Gramos de carne (solo números)
      });
    }

  ngOnInit(): void {
    this.route.params?.subscribe((params: Params) => {
      if (params && params['id']) {
        this.id = params['id'];
        this.guestsService.getGuestById(this.id).subscribe((guest: any) => {
          this.guest = {};
          this.guest.id = this.id;
          this.guest.userName = guest.userName;
          this.guest.meat = guest.meat;
          this.guest.salad = guest.salad;
          console.log(guest);
        });
      }
    });
  }

  onSubmit() {
    if (this.editForm.valid) {
      // Procesa los datos del formulario
      console.log('Formulario válido', this.editForm.value);
      let payload = {
        userName: this.guest?.userName && !(this.editForm.value.inputName || this.editForm.value.inputLastname)? this.guest?.userName : (this.editForm.value.inputName + ' ' + this.editForm.value.inputLastname),
        meat: this.guest?.meat && !this.editForm.value.grCarne ? this.guest?.meat : this.editForm.value.grCarne,
      }
      // Si hubo un id pasado por parametro, se llama a editGuest
      if (this.id) {
        this.guestsService.editGuest(this.id, payload).subscribe();
      } else {
        this.guestsService.createGuest(payload);
      }
    } else {
      console.log('Formulario inválido');
    }
  }
}
