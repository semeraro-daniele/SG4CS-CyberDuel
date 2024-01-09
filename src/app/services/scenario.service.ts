import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IScenario } from '../models/scenario';

@Injectable({
  providedIn: 'root',
})
export class ScenarioService {
  private scenariosUrl = 'assets/scenarios/';

  constructor(private http: HttpClient) {}

  getScenario(type: string): Observable<IScenario[]> {
    const url = `${this.scenariosUrl}${type}.json`;
    return this.http.get<IScenario[]>(url);
  }
}
