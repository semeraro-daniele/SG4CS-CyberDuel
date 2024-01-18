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

  screens = ['1', '2', '3', '4'];

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
