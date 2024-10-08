import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ConfirmedGuestsComponent } from './confirmed-guests/confirmed-guests.component';
import { ListGuestComponent } from './list-guest/list-guest.component';
import { EditGuestComponent } from './home/edit-guest/edit-guest.component';
/*
export const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'confirmed-guests', component: ConfirmedGuestsComponent},
    {path: '**', redirectTo: '', pathMatch: 'full'}
];*/

export const routes: Routes = [
    { 
      path: '', 
      component: HomeComponent,
      children: [
        { path: '', redirectTo: 'guests', pathMatch: 'full' }, // ruta por defecto al cargar HomeComponent
        { path: 'confirmed-guests', component: ConfirmedGuestsComponent },
        { path: 'guests', component: ListGuestComponent },
        { path: 'edit-guest/:id', component: EditGuestComponent},
        { path: 'edit-guest', component: EditGuestComponent}
      ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }
  ];