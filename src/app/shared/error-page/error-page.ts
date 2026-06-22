
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { LanguageService } from '../../services/language.service';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    TranslateModule
],
  selector: 'app-error-page',
  changeDetection: ChangeDetectionStrategy.Eager,
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
