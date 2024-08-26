import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dropdown-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dropdown-menu.component.html',
  styleUrl: './dropdown-menu.component.scss'
})
export class DropdownMenuComponent {
  @Output() sectionTitle = new EventEmitter<string>();
  userName = "Carlos Perez";
  selectedTitle = 'Invitados';

  constructor(private router: Router) {}

  changeSectionTitle(value: string, path: string) {
    this.selectedTitle = value;
    this.sectionTitle.emit(value);
    this.router.navigate([path]);
  }
}
