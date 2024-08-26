import { Component } from '@angular/core';
import { SearchComponent } from "../search/search.component";
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SearchComponent, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  searchTerm: string = '';

  constructor(private router: Router, private route: ActivatedRoute) {}

  onSearch(term: string) {
    this.searchTerm = term;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { search: this.searchTerm },
      queryParamsHandling: 'merge'
    });
  }
}
