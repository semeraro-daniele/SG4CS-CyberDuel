import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { LanguageService } from '../../services/language.service';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule
  ],
  selector: 'app-error-page',
  templateUrl: './error-page.html'
})
export class ErrorPage implements OnInit {
  constructor(
    private languageService: LanguageService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.translate.use(this.languageService.getLanguage());
  }
}
