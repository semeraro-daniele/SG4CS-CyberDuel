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
  selector: 'app-settings',
  templateUrl: './settings.html'
})
export class Settings implements OnInit {
  @Input() isModalOpen: boolean = true;
  @Output() closeEmit = new EventEmitter<void>();

  constructor(
    private translate: TranslateService,
    private languageService: LanguageService
  ) { }

  ngOnInit() {
    const savedLanguage = this.languageService.getLanguage();
    this.setLanguage(savedLanguage);
  }

  closeModal() {
    this.isModalOpen = false;
    this.closeEmit.emit();
  }

  setLanguage(language: string) {
    this.translate.use(language);
    this.languageService.setLanguage(language);
    this.closeModal();
  }
}
