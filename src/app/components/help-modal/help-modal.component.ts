import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-help-modal',
  templateUrl: './help-modal.component.html',
  styleUrls: ['./help-modal.component.css'],
})
export class HelpModalComponent {
  @Input() isModalOpen: boolean = true;
  @Output() closeEmit = new EventEmitter<void>();
 
  currentScreenIndex: number = 0;

  screens = [
    {
      content:
        "The game consists of choosing one of the blue cards, the card you think is the most correct. Once selected, the powers of the chosen card and the powers of the hacker's card will be shown.",
    },
    {
      content:
        "If the powers of the chosen card are greater than the powers of the hacker's card, the hacker will lose life points corresponding to the difference in powers between the cards.",
    },
    {
      content:
        "Otherwise, if the powers of the hacker's card are greater than the powers of the chosen card, you will lose life points corresponding to the difference in powers between the cards.",
    },
    {
      content: 'The game ends when one of the two teams loses all the life points or the questions will be finished. Let\'s play and make the right decisions!',
    },
  ];

  resetModal() {
    this.currentScreenIndex = 0;
  }

  goBack() {
    if (this.currentScreenIndex > 0) {
      this.currentScreenIndex--;
    }
  }

  goNext() {
    if (this.currentScreenIndex < this.screens.length - 1) {
      this.currentScreenIndex++;
    } else {
      this.closeModal();
    }
  }

  closeModal() {
    this.isModalOpen = false;
    this.resetModal();
    this.closeEmit.emit();
  }
}
