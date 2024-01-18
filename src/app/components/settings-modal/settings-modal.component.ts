import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-settings-modal',
  templateUrl: './settings-modal.component.html',
})
export class SettingsModalComponent implements OnInit{
  @Input() isModalOpen: boolean = true;
  @Output() closeEmit = new EventEmitter<void>();

  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.setLanguage('en');
  }

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
      content:
        "The game ends when one of the two teams loses all the life points or the questions will be finished. Let's play and make the right decisions!",
    },
  ];

  resetModal() {
    this.currentScreenIndex = 0;
  }

  closeModal() {
    this.isModalOpen = false;
    this.resetModal();
    this.closeEmit.emit();
  }

  setLanguage(language: string) {
    this.translate.use(language);
  }
}
