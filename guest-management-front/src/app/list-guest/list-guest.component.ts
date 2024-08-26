import { Component, OnInit } from '@angular/core';
import { GuestsService } from '../service/guests.service';
import { CommonModule } from '@angular/common';
import { CardComponent } from "../card/card.component";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-guest',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './list-guest.component.html',
  styleUrl: './list-guest.component.scss'
})
export class ListGuestComponent implements OnInit {
  guests!: any[];
  showSuccessMessage: boolean = false;
  showErrorMessage: boolean = false;
  message: string = '';
  searchTerm: string = '';
  
  constructor(private guestsService: GuestsService,
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['search'] || '';
      this.getGuests(params['search'] ? params['search'] : null);
    });
  }
  
  getGuests(search?: string) {
    // Metodo que obtiene lista de invitados
    this.guestsService.getGuests().subscribe((value: any[]) => {
      let result = value.map((item: any) => {
        // Mapea elemento para agregar atributo precio
        item.price = this.formatNumberWithCommas('' + this.guestsService.calculatePrice(item.meat, item.salad));
        return item;
      })
      this.guests = search ? result.filter(guest =>
        // Filtrado si se envía por el parametro search
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

  onCreateGuest() {
    this.router.navigate(['edit-guest']);
  }

  setSuccessMessage(message: string) {
    // Muestra mensaje de éxito y oculta después de 3 segundos
    this.message = message;
    this.showSuccessMessage = true;
    this.getGuests(this.searchTerm);
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
