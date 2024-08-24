import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { GuestsService } from '../../service/guests.service';

@Component({
  selector: 'app-edit-guest',
  standalone: true,
  imports: [],
  templateUrl: './edit-guest.component.html',
  styleUrl: './edit-guest.component.scss'
})
export class EditGuestComponent implements OnInit {
  guest!: any;
  id!: any;

  constructor(private route: ActivatedRoute, 
    private guestsService: GuestsService) {}

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
        });
      }
    });
  }

  onSubmit() {
    // Si hubo un id pasado por parametro, se llama a editGuest
    if (this.id) {
      this.guestsService.editGuest(this.id, this.guest).subscribe();
    } else {
      this.guestsService.createGuest(this.guest);
    }
  }
}
