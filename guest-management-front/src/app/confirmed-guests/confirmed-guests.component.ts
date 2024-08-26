import { Component, OnInit } from '@angular/core';
import { GuestsService } from '../service/guests.service';
import { CardComponent } from '../card/card.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-confirmed-guests',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './confirmed-guests.component.html',
  styleUrl: './confirmed-guests.component.scss'
})
export class ConfirmedGuestsComponent implements OnInit {
  guests!: any[];
  searchTerm = '';
  showSuccessMessage: boolean = false;
  showErrorMessage: boolean = false;
  message: string = '';
  
  constructor(private guestsService: GuestsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getConfirmedGuests();
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['search'] || '';
      this.getConfirmedGuests(params['search'] ? params['search'] : null);
    });
  }
  
  getConfirmedGuests(search?: string) {
    this.guestsService.getGuests().subscribe((value: any[]) => {
      console.log(value);
      // Filtrar los elementos que tienen confirmation en true
      let confirmedGuests = value.filter((item: any) => item.confirmation === true);

      // Mapea por elementos para añadirles el atributo precio
      let result = confirmedGuests.map((item: any) => {
        item.price = this.formatNumberWithCommas('' + this.guestsService.calculatePrice(item.meat, item.salad));
        return item;
      })
      this.guests = search ? result.filter(guest =>
        guest.userName.toLowerCase().includes(this.searchTerm.toLowerCase())
      ) : result;
    });
  }

  formatNumberWithCommas(numberString: string): string {
    const number = parseFloat(numberString);
    
    if (isNaN(number)) {
        return numberString; // Devuelve el string original si no se puede convertir a número
    }

    return number.toLocaleString('es-AR');
  }

  calculatePrice() {
    let result = 0;
    this.guests?.forEach((element: any) => {
      result += parseFloat(element.price);
    });
    // Convierte a un número con decimales a miles
    const resultWithDecimals = result.toFixed(3); 

    return resultWithDecimals;
  }

  setSuccessMessage(message: string) {
    // Muestra mensaje de éxito y oculta después de 3 segundos
    this.message = message;
    this.showSuccessMessage = true;
    this.getConfirmedGuests(this.searchTerm);
    setTimeout(() => {
      this.showSuccessMessage = false;
    }, 3000);
  }

  setErrorMessage(message: string) {
    // Muestra mensaje de error y oculta después de 3 segundos
    this.message = message;
    this.showErrorMessage = true;
    setTimeout(() => this.showErrorMessage = false, 3000);
  }
}
