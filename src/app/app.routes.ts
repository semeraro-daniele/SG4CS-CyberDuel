import { Routes } from '@angular/router';
import { Game } from './pages/game/game';
import { Home } from './pages/home-page/home-page';
import { ErrorPage } from './shared/error-page/error-page';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: Home },
    { path: 'game/:difficulty', component: Game },
    { path: '**', pathMatch: 'full', component: ErrorPage }
];
