import { Routes } from '@angular/router';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { GameComponent } from './components/game/game.component';

export const AppRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'game/:difficulty', component: GameComponent },
  { path: '**', pathMatch: 'full', component: ErrorPageComponent }
];
