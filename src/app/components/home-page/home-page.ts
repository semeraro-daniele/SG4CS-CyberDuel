import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { Help } from '../../dialogs/help/help';
import { Settings } from '../../dialogs/settings/settings';
import { LanguageService } from '../../services/language.service';

@Component({
  standalone: true,
    imports: [
    CommonModule,
    TranslateModule,
    Settings
],
  selector: 'app-home-page',
  templateUrl: './home-page.html'
})
export class Home implements OnInit {
  @ViewChild(Help) settingModal!: Settings;

  constructor(
    private router: Router,
    private languageService: LanguageService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.translate.use(this.languageService.getLanguage());
  }

  isModalOpen: boolean = false;
  isSettingsModalOpen: boolean = false;

  handleModal(value: boolean) {
    this.isModalOpen = value;
  }

  handleSettingsModal(value: boolean) {
    this.isSettingsModalOpen = value;
  }

  startGame(difficulty: string) {
    this.router.navigate(['/game', difficulty]);
  }
}
