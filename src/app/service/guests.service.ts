import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuestsService {
  private pricePerMeat = 30;
  private pricePerSaladItem = 200;
  guests = [
    {
      "userName": "Mariana Pérez",
      "confirmation": true,
      "meat": 300,
      "salad": ["tomate", "lechuga"]
    },
    {
      "userName": "Joaquín Ramírez",
      "confirmation": false,
      "meat": 0,
      "salad": []
    },
    {
      "userName": "Sofía González",
      "confirmation": true,
      "meat": 400,
      "salad": ["cebolla"]
    },
    {
      "userName": "Lucas Martín",
      "confirmation": true,
      "meat": 250,
      "salad": ["tomate", "cebolla"]
    },
    {
      "userName": "Florencia Díaz",
      "confirmation": false,
      "meat": 0,
      "salad": []
    },
    {
      "userName": "Carlos Fernández",
      "confirmation": true,
      "meat": 350,
      "salad": ["lechuga", "tomate"]
    }
  ];
  
  constructor() { }

  getGuests(): Observable<any> {
    console.log("en el servicio",this.guests);
    return of(this.guests);
  }

  getConfirmedGuests(): Observable<any[]> {
    return of(this.guests.filter((value: any) => value.confirmation));
  }

  calculatePrice(meat: number, salad: string[]): number {
    return this.pricePerMeat * (meat ? meat : 0) + this.pricePerSaladItem * (salad ? salad.length : 0);
  }

}
