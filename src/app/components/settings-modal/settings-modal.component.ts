import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-settings-modal',
  templateUrl: './settings-modal.component.html',
})
export class SettingsModalComponent implements OnInit {
  @Input() isModalOpen: boolean = true;
  @Output() closeEmit = new EventEmitter<void>();

  constructor(
    private translate: TranslateService,
    private languageService: LanguageService
  ) {}

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
