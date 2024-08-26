import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { GuestsService } from '../service/guests.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit {
  @Input() guest!: any;
  @Output() successMessage = new EventEmitter<string>();
  @Output() errorMessage = new EventEmitter<string>();

  constructor(private router: Router, 
    private guestsService: GuestsService) {}

  ngOnInit(): void {
    
  }

  isFirstAndNotUnique(index: number) {
    let result = false;
    if (this.guest && this.guest.salad) {
      result = this.guest.salad.length > 1 && index === 0;
    }
    return result;
  }

  onEditGuest() {
    this.guestsService.getGuestById(this.guest.id).subscribe((value: any) => {
      if (value) {
        this.router.navigate(['edit-guest', this.guest.id]);
      }
    });
  }

  onUpdateConfirmation(confirm: boolean) {
    this.guestsService.updateConfirmation(this.guest.id, confirm).subscribe({
      next: () => {
        let successMessage = 'Cambio de confirmación del invitado ' + this.guest.userName +'.';
        this.successMessage.emit(successMessage);
      },
      error: (err) => {
        let errorMessage = 'Error en cambio de confirmación del invitado ' + this.guest.userName +': ' +err.message+'.';
        this.errorMessage.emit(errorMessage);
      }
    });
  }
}
