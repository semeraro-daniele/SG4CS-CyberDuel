import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICard } from 'src/app/models/card';
import { IScenario } from 'src/app/models/scenario';
import { ScenarioService } from 'src/app/services/scenario.service';
import { HelpModalComponent } from '../help-modal/help-modal.component';
import { SettingsModalComponent } from '../settings-modal/settings-modal.component';
import { LanguageService } from 'src/app/services/language.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  @ViewChild(HelpModalComponent) helpModal!: HelpModalComponent;
  @ViewChild(HelpModalComponent) settingModal!: SettingsModalComponent;

  constructor(
    private scenarioService: ScenarioService,
    private route: ActivatedRoute,
    private router: Router,
    private languageService: LanguageService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.language = this.languageService.getLanguage();
    this.translate.use(this.language);
    this.difficulty = this.route.snapshot.url[1].path;
    switch (this.route.snapshot.url[1].path) {
      case 'tutorial':
        this.playerLife = 1;
        this.playerStartLife = this.playerLife;
        this.hackerLife = 1;
        this.hackerStartLife = this.hackerLife;
        this.isHelpModalOpen = true;

        const visitedTutorial = localStorage.getItem('visitedTutorial');

        if (!visitedTutorial) {
          this.isSettingsModalOpen = true;
          localStorage.setItem('visitedTutorial', 'true');
        }

        break;
      case 'easy':
        this.playerLife = 15;
        this.playerStartLife = this.playerLife;
        this.hackerLife = 5;
        this.hackerStartLife = this.hackerLife;
        break;
      case 'medium':
        this.playerLife = 10;
        this.playerStartLife = this.playerLife;
        this.hackerLife = 10;
        this.hackerStartLife = this.hackerLife;
        break;
      case 'hard':
        this.playerLife = 5;
        this.playerStartLife = this.playerLife;
        this.hackerLife = 15;
        this.hackerStartLife = this.hackerLife;
        break;
    }
    this.loadScenarios();
  }

  language: string = '';
  difficulty: string = '';
  scenarioDifficulty: string = 'scenario_';
  playerLife: number = 0;
  hackerLife: number = 0;
  playerPercent: number = 100;
  hackerPercent: number = 100;

  playerStartLife = this.playerLife;
  hackerStartLife = this.hackerLife;

  winner: any = { name: '', message: '' };
  isWinnerMessage: boolean = false;

  isRevealHackerPower: boolean = false;
  isRevealPlayerPower: boolean = false;
  isGameBoardCardSelected: boolean = false;
  isCompareCards: number = 0;
  isNextButton: boolean = false;
  isGameFinished: boolean = false; // Game finished

  hackerCard: ICard = { description: '', power: 0 };
  playerCards: ICard[] = [];

  // Explanation card
  explanationCard: string = '';
  isExplanationCard: boolean = false;

  selectedCard!: ICard;
  isSelectedCard: boolean = false;

  scenarios!: IScenario[];
  scenarioIndex: number = 0;
  usedScenarioIndices: number[] = [];

  isSettingsModalOpen: boolean = false;
  isHelpModalOpen: boolean = false;
  isExitModalOpen: boolean = false;
  isErrorScenarioModalOpen: boolean = false;

  loadScenarios() {
    this.scenarioService
      .getScenario(
        this.scenarioDifficulty + this.difficulty + '_' + this.language
      )
      .subscribe(
        (scenarios) => {
          if (scenarios && scenarios.length > 0) {
            this.scenarios = scenarios;

            this.shuffleScenarios(this.scenarios.length);

            this.startGame();
          } else {
            console.error('No scenarios available.');
          }
        },
        (error) => {
          this.isErrorScenarioModalOpen = true;
          console.error('Error loading scenarios:', error);
        }
      );
  }

  shuffleScenarios(n: number) {
    this.usedScenarioIndices = Array.from({ length: n }, (_, index) => index);
    // Shuffling dell'array utilizzando l'algoritmo di Fisher-Yates
    for (let i = this.usedScenarioIndices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.usedScenarioIndices[i], this.usedScenarioIndices[j]] = [
        this.usedScenarioIndices[j],
        this.usedScenarioIndices[i],
      ];
    }
  }

  shufflePlayerCards() {
    for (let i = this.playerCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.playerCards[i], this.playerCards[j]] = [
        this.playerCards[j],
        this.playerCards[i],
      ];
    }
  }

  startGame() {
    if (this.scenarios.length > 0) {
      this.shuffleScenarios(this.scenarios.length);

      this.hackerCard = this.scenarios[this.usedScenarioIndices[0]].hackerCard;
      this.playerCards =
        this.scenarios[this.usedScenarioIndices[0]].playerCards;

      this.shufflePlayerCards();

      // Explanation card
      this.explanationCard = this.scenarios[this.usedScenarioIndices[0]]
        .explanation
        ? this.scenarios[this.usedScenarioIndices[0]].explanation
        : 'No explanation!';
    } else {
      console.error('No scenarios available.');
    }
  }

  nextTurn() {
    if (!this.isGameFinished) {
      this.isRevealHackerPower = false;
      this.isRevealPlayerPower = false;
      this.isGameBoardCardSelected = false;
      this.isCompareCards = 0;
      this.isNextButton = false;
      this.isExplanationCard = false;

      this.scenarioIndex = this.scenarioIndex + 1;

      if (this.scenarioIndex < this.scenarios.length) {
        const nextScenario = this.scenarios[this.scenarioIndex];
        this.hackerCard = nextScenario.hackerCard;
        this.playerCards = nextScenario.playerCards;
        this.explanationCard = nextScenario.explanation;
        this.shufflePlayerCards();
        this.isSelectedCard = false;
      } else {
        this.isWinnerMessage = true;
        this.isGameFinished = true;
        console.log('You have completed all scenarios.');
      }
    } else {
      this.isWinnerMessage = true;
      this.isExplanationCard = false;
      this.isNextButton = false;
    }
  }

  // When a card is clicked
  cardClicked(cardSelected: ICard, hackerCard: ICard) {
    if (this.isSelectedCard) {
      return;
    }

    this.isSelectedCard = true;
    this.selectedCard = cardSelected;

    this.isGameBoardCardSelected = true;

    // Wait 500ms to reveal the powers
    setTimeout(() => {
      this.isRevealHackerPower = true;
      this.isRevealPlayerPower = true;
    }, 500);

    // Wait 800ms to reveal the explanation
    setTimeout(() => {
      this.isExplanationCard = true;
    }, 800);

    // Wait 1200ms to compare the card scores
    setTimeout(() => {
      this.compareCards(cardSelected, hackerCard);
    }, 1200);
  }

  compareCards(playerCard: ICard, hackerCard: ICard) {
    if (!playerCard || !hackerCard) {
      console.error('Invalid cards provided');
      return;
    }

    let powerDifference = playerCard.power - hackerCard.power;

    if (powerDifference < 0) {
      // Player Loses
      this.playerLife = this.playerLife + powerDifference;
      this.isCompareCards = 1;
    } else if (powerDifference > 0) {
      // Player Wins
      this.hackerLife = this.hackerLife - powerDifference;
      this.isCompareCards = 2;
    } else {
      this.isCompareCards = 3;
    }

    this.updateScores();

    this.isNextButton = true;
  }

  updateScores() {
    // Update the hacker lifebar
    this.hackerPercent = (this.hackerLife / this.hackerStartLife) * 100;
    if (this.hackerPercent < 0) {
      this.hackerPercent = 0;
    }

    // Update the player lifebar
    this.playerPercent = (this.playerLife / this.playerStartLife) * 100;
    if (this.playerPercent < 0) {
      this.playerPercent = 0;
    }

    if (this.playerLife <= 0) {
      this.playerLife = 0;
      this.isGameFinished = true;
      this.winner.name = 'Hacker';
      this.winner.message = this.translate.instant('gameOverMessage');
    } else if (this.hackerLife <= 0) {
      this.hackerLife = 0;
      this.isGameFinished = true;
      this.winner.name = 'Player';
      this.winner.message = this.translate.instant('victoryMessage');
    } else {
      this.winner.name = 'None';
      this.winner.message = this.translate.instant('tieMessage');
    }
  }

  restartGame() {
    // Reimposta le variabili di stato al loro stato iniziale
    this.playerLife = 5;
    this.hackerLife = 5;
    this.playerPercent = 100;
    this.hackerPercent = 100;
    this.winner = { winner: '', winnerMessage: '' };
    this.isRevealHackerPower = false;
    this.isRevealPlayerPower = false;
    this.isGameBoardCardSelected = false;
    this.isCompareCards = 0;
    this.isNextButton = false;
    this.isGameFinished = false;
    this.isWinnerMessage = false;
    this.hackerCard = { description: '', power: 0 };
    this.playerCards = [];
    this.explanationCard = '';
    this.isExplanationCard = false;
    this.isSelectedCard = false;
    this.scenarioIndex = 0;
    this.isExitModalOpen = false;

    this.ngOnInit();

    // Start a new game
    this.startGame();
  }

  handleSettingsModal(value: boolean) {
    this.isSettingsModalOpen = value;
  }

  handleHelpModal(value: boolean) {
    this.isHelpModalOpen = value;
    if (this.isHelpModalOpen) {
      this.helpModal.resetModal();
    }
  }

  handleExitModal(value: boolean) {
    this.isExitModalOpen = value;
  }

  responseExitModal(value: boolean) {
    if (value) {
      this.router.navigate(['/home']);
      this.handleExitModal(false);
    } else {
      this.handleExitModal(false);
    }
  }

  // Explanation card
  toggleExplanationCard() {
    this.isExplanationCard = !this.isExplanationCard;
  }
}
