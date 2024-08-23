import { Component, OnInit } from '@angular/core';
import { GuestsService } from '../service/guests.service';
import { CardComponent } from '../card/card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirmed-guests',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './confirmed-guests.component.html',
  styleUrl: './confirmed-guests.component.scss'
})
export class ConfirmedGuestsComponent implements OnInit {
  guests!: any[];
  
  constructor(private guestsService: GuestsService) {}

  ngOnInit(): void {
    this.getConfirmedGuests();
  }
  
  getConfirmedGuests() {
    this.guestsService.getConfirmedGuests().subscribe((value: any[]) => {
      console.log(value);
      let result = value.map((item: any) => {
        item.price = this.formatNumberWithCommas('' + this.guestsService.calculatePrice(item.meat, item.salad));
        return item;
      })
      this.guests = result;
    });
  }

  formatNumberWithCommas(numberString: string): string {
    const number = parseFloat(numberString);
    
    if (isNaN(number)) {
        return numberString; // Devuelve el string original si no se puede convertir a número
    }

    return number.toLocaleString('es-AR');
  }
}
