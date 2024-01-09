import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './components/app.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { RouterModule } from '@angular/router';
import { AppRoutes } from './app.routes';
import { HomePageComponent } from './components/home-page/home-page.component';
import { GameComponent } from './components/game/game.component';
import { HttpClientModule } from '@angular/common/http';
import { HelpModalComponent } from './components/help-modal/help-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
    HomePageComponent,
    GameComponent,
    HelpModalComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(AppRoutes),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
