import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
})
export class ErrorPageComponent implements OnInit {
  constructor(
    private languageService: LanguageService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.translate.use(this.languageService.getLanguage());
  }
}
