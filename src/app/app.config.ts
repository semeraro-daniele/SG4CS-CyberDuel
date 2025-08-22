import { HttpClient, provideHttpClient } from '@angular/common/http';
import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { routes } from './app.routes';

export class CustomTranslateHttpLoader implements TranslateLoader {
  constructor(private http: HttpClient) {}

  getTranslation(lang: string): Observable<any> {
    return this.http.get(`./assets/i18n/${lang}.json`);
  }
}

export function HttpLoaderFactory(http: HttpClient) {
  return new CustomTranslateHttpLoader(http);
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),

    importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage: 'it',
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      })
    )
  ]
};