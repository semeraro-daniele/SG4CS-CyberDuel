import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly LANGUAGE_KEY = 'selectedLanguage';

  getLanguage(): string {
    return localStorage.getItem(this.LANGUAGE_KEY) || 'en';
  }

  setLanguage(language: string) {
    localStorage.setItem(this.LANGUAGE_KEY, language);
  }
}
