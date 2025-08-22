import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { LanguageService } from '../../services/language.service';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule
  ],
  selector: 'app-help',
  templateUrl: './help.html',
  styleUrl: './help.css'
})
export class Help implements OnInit {
  constructor(
    private translate: TranslateService,
    private languageService: LanguageService
  ) { }

  ngOnInit() {
    this.translate.use(this.languageService.getLanguage());
  }

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
