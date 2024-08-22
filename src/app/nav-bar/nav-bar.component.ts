import { Component } from '@angular/core';
import { DropdownMenuComponent } from "./dropdown-menu/dropdown-menu.component";

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [DropdownMenuComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  title = 'Asado';
  sectionTitle = 'Invitados';
}
