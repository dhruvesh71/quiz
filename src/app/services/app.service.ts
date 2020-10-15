import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Questions } from '../interfaces/questions';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  /*
   * Method will fetch the list of questions from http.
   */
  public fetchQuestions(): Observable<Questions> {
    return this.http.get<Questions>('../../assets/questions.json');
  }
}
