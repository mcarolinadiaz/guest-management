import { Component, OnInit } from '@angular/core';
import { DropdownMenuComponent } from "./dropdown-menu/dropdown-menu.component";
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [DropdownMenuComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit{
  title = 'Asado';
  sectionTitle: string = 'Invitados';
  
  constructor(private router: Router, 
    private activeRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateSectionTitle();
      });
  }

  setSectionTitle(value: string) {
    this.sectionTitle = value;
  }

  private updateSectionTitle() {
    // Obtiene el fragmento de ruta actual y actualiza el sectionTitle según sea necesario.
    const currentRoute = this.getActiveRoute(this.activeRoute);
    const currentPath = currentRoute.snapshot.url.map(segment => segment.path).join('/');
    
    switch (currentPath) {
      case 'guests':
        this.sectionTitle = 'Invitados';
        break;
      case 'confirmed-guests':
        this.sectionTitle = 'Confirmados';
        break;
      case 'edit-guest':
        this.sectionTitle = 'Edición';
        break;
      default:
        this.sectionTitle = 'Invitados';
    }
  }

  // Recorre el arbol de rutas
  private getActiveRoute(route: ActivatedRoute): ActivatedRoute {
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route;
  }
}
