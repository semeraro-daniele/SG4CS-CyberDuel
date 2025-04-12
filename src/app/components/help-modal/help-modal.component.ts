import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/services/language.service';

@Component({
    selector: 'app-help-modal',
    templateUrl: './help-modal.component.html',
    styleUrls: ['./help-modal.component.css'],
    standalone: false
})
export class HelpModalComponent  implements OnInit {
  constructor(
    private languageService: LanguageService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.translate.use(this.languageService.getLanguage());
  }
  
  @Input() isModalOpen: boolean = true;
  @Output() closeEmit = new EventEmitter<void>();
  currentScreenIndex: number = 0;

  screens = ['1', '2', '3', '4'];

  resetModal() {
    this.currentScreenIndex = 0;
  }

  goBack() {
    if (this.currentScreenIndex > 0) {
      this.currentScreenIndex--;
    }
  }

  goNext() {
    if (this.currentScreenIndex < this.screens.length - 1) {
      this.currentScreenIndex++;
    } else {
      this.closeModal();
    }
  }

  closeModal() {
    this.isModalOpen = false;
    this.resetModal();
    this.closeEmit.emit();
  }
}
