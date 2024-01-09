import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html'
})
export class HomePageComponent {
  constructor(private router: Router) {}

  isModalOpen: boolean = false;

  handleModal(value: boolean) {
    this.isModalOpen = value;
  }

  startGame(difficulty: string) {
    this.router.navigate(['/game', difficulty]);
  }
}
