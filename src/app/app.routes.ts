import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ConfirmedGuestsComponent } from './confirmed-guests/confirmed-guests.component';

export const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'confirmed-guests', component: ConfirmedGuestsComponent},
    {path: '**', redirectTo: '', pathMatch: 'full'}
];
