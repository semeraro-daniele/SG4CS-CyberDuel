import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
})
export class HomePageComponent implements OnInit {
  constructor(
    private router: Router,
    private languageService: LanguageService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.translate.use(this.languageService.getLanguage());
  }

  isModalOpen: boolean = false;

  handleModal(value: boolean) {
    this.isModalOpen = value;
  }

  startGame(difficulty: string) {
    this.router.navigate(['/game', difficulty]);
  }
}
