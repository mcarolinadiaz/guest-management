import { Component, OnInit } from '@angular/core';
import { GuestsService } from '../service/guests.service';
import { CommonModule } from '@angular/common';
import { CardComponent } from "../card/card.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-guest',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './list-guest.component.html',
  styleUrl: './list-guest.component.scss'
})
export class ListGuestComponent implements OnInit {
  guests!: any[];
  
  constructor(private guestsService: GuestsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getGuests();
  }
  
  getGuests() {
    this.guestsService.getGuests().subscribe((value: any[]) => {
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

  onCreateGuest() {
    this.router.navigate(['edit-guest']);
  }
}
