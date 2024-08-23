import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit {
  @Input() guest!: any;

  ngOnInit(): void {
    
  }

  isFirstAndNotUnique(index: number) {
    let result = false;
    if (this.guest && this.guest.salad) {
      result = this.guest.salad.length > 1 && index === 0;
    }
    return result;
  }
}
