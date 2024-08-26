import { HttpClient } from '@angular/common/http';
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
      "id": 0,
      "userName": "Mariana Pérez",
      "confirmation": true,
      "meat": 300,
      "salad": ["tomate", "lechuga"]
    },
    {
      "id": 1,
      "userName": "Joaquín Ramírez",
      "confirmation": false,
      "meat": 0,
      "salad": []
    },
    {
      "id": 2,
      "userName": "Sofía González",
      "confirmation": true,
      "meat": 400,
      "salad": ["cebolla"]
    },
    {
      "id": 3,
      "userName": "Lucas Martín",
      "confirmation": true,
      "meat": 250,
      "salad": ["tomate", "cebolla"]
    },
    {
      "id": 4,
      "userName": "Florencia Díaz",
      "confirmation": false,
      "meat": 0,
      "salad": []
    },
    {
      "id": 5,
      "userName": "Carlos Fernández",
      "confirmation": true,
      "meat": 350,
      "salad": ["lechuga", "tomate"]
    }
  ];
  baseUrl = 'http://localhost:3000/guests';
  
  constructor(private httpClient: HttpClient) { }

  getGuests(): Observable<any> {
    return this.httpClient.get(this.baseUrl);
    //return of(this.guests); // DEPRECADO POR MOCKEO
  }

  getGuestById(id: number): Observable<any> {
    //return of(this.guests.filter((guest: any) => guest.id == id));
    return this.httpClient.get(this.baseUrl + '/' + id);
  }

  createGuest(payload: any): Observable<any> {
    
    /* DEPRECADO por mockeo
    const newId = this.guests[this.guests.length-1].id + 1;
    let newGuest = {
      "id": newId,
      "userName": payload.userName,
      "confirmation": payload.confirmation ? payload.confirmation : false,
      "meat": payload.meat,
      "salad": new Array()
    };
    payload.salad?.forEach((element: any) => {
      return newGuest.salad.push(element);
    });
    this.guests.push(newGuest);
    return of(this.guests);*/
    return this.httpClient.post(this.baseUrl, payload);
  }

  editGuest(id: number, payload: any): Observable<any> {
    /*this.guests = this.guests.map((item: any) => {
      let result = item;
      if (result.id == id) {
        result.userName = payload.userName;
        result.confirmation = payload.confirmation ? payload.confirmation : false;
        result.meat = payload.meat ? payload.meat : 0;
        result.salad = payload.salad ? payload.salad : [];
      }
      return result;
    });
    return of(this.guests);*/
    return this.httpClient.put(this.baseUrl + '/' + id, payload);
  }

  /* DEPRECADO POR MOCKEO
  getConfirmedGuests(): Observable<any[]> {
    return of(this.guests.filter((value: any) => value.confirmation));
  }*/

  calculatePrice(meat: number, salad: string[]): number {
    return this.pricePerMeat * (meat ? meat : 0) + this.pricePerSaladItem * (salad ? salad.length : 0);
  }
  
  updateConfirmation(id: number, confirm: boolean): Observable<any> {
    /* DEPRECADO por mockeo
    this.guests = this.guests.map((item: any) => {
      let result = item;
      if (result.id == id) {
        result.confirmation = confirm ? confirm : false;
      }
      return result;
    });*/
    const payload = {
      confirmation: confirm
    }
    return this.editGuest(id, payload);
    //return of(this.guests);
  }
}
