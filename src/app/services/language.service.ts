import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly STORAGE_KEY = 'selectedLanguage';
  private readonly DEFAULT_LANGUAGE = 'en';
  private readonly AVAILABLE_LANGUAGES = ['en', 'it'];

  constructor(private translate: TranslateService) {
    this.initializeLanguage();
  }

  private initializeLanguage(): void {
    const savedLanguage = this.getLanguage();
    this.translate.setDefaultLang(this.DEFAULT_LANGUAGE);
    this.translate.use(savedLanguage);
  }

  setLanguage(language: string): void {
    if (this.AVAILABLE_LANGUAGES.includes(language)) {
      this.translate.use(language);
      localStorage.setItem(this.STORAGE_KEY, language);
    } else {
      console.warn(`Language "${language}" is not supported. Available languages:`, this.AVAILABLE_LANGUAGES);
    }
  }

  getLanguage(): string {
    const savedLanguage = localStorage.getItem(this.STORAGE_KEY);
    return savedLanguage && this.AVAILABLE_LANGUAGES.includes(savedLanguage)
      ? savedLanguage
      : this.DEFAULT_LANGUAGE;
  }

  getCurrentLanguage(): string {
    return this.translate.currentLang || this.DEFAULT_LANGUAGE;
  }

  getAvailableLanguages(): string[] {
    return [...this.AVAILABLE_LANGUAGES];
  }

  isLanguageSupported(language: string): boolean {
    return this.AVAILABLE_LANGUAGES.includes(language);
  }

  getBrowserLanguage(): string {
    const browserLang = this.translate.getBrowserLang();
    return browserLang && this.AVAILABLE_LANGUAGES.includes(browserLang)
      ? browserLang
      : this.DEFAULT_LANGUAGE;
  }

  initializeWithBrowserLanguage(): void {
    const savedLanguage = localStorage.getItem(this.STORAGE_KEY);
    if (!savedLanguage) {
      const browserLang = this.getBrowserLanguage();
      this.setLanguage(browserLang);
    }
  }
}