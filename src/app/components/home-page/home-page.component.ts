import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/services/language.service';
import { HelpModalComponent } from '../help-modal/help-modal.component';
import { SettingsModalComponent } from '../settings-modal/settings-modal.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
})
export class HomePageComponent implements OnInit {
  @ViewChild(HelpModalComponent) settingModal!: SettingsModalComponent;

  constructor(
    private router: Router,
    private languageService: LanguageService,
    private translate: TranslateService
  ) {}

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
