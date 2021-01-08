import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from '../message.service';

import { Goal } from '../goal';


@Injectable({ providedIn: 'root' })
export class GoalService {

  private goalsUrl = 'api/goals';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET goals from the server */
  getGoals(): Observable<Goal[]> {
    return this.http.get<Goal[]>(this.goalsUrl)
      .pipe(
        tap(_ => this.log('fetched goals')),
        catchError(this.handleError<Goal[]>('getGoals', []))
      );
  }

  /** GET goal by id. Return `undefined` when id not found */
  getGoalNo404<Data>(id: number): Observable<Goal> {
    const url = `${this.goalsUrl}/?id=${id}`;
    return this.http.get<Goal[]>(url)
      .pipe(
        map(goals => goals[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} goal id=${id}`);
        }),
        catchError(this.handleError<Goal>(`getGoal id=${id}`))
      );
  }

  /** GET goal by id. Will 404 if id not found */
  getGoal(id: number): Observable<Goal> {
    const url = `${this.goalsUrl}/${id}`;
    return this.http.get<Goal>(url).pipe(
      tap(_ => this.log(`fetched goal id=${id}`)),
      catchError(this.handleError<Goal>(`getGoal id=${id}`))
    );
  }

  /* GET goales whose name contains search term */
  searchGoals(term: string): Observable<Goal[]> {
    if (!term.trim()) {
      // if not search term, return empty goal array.
      return of([]);
    }
    return this.http.get<Goal[]>(`${this.goalsUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found goals matching "${term}"`) :
         this.log(`no goals matching "${term}"`)),
      catchError(this.handleError<Goal[]>('searchGoals', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new goal to the server */
  addGoal(goal: Goal): Observable<Goal> {
    return this.http.post<Goal>(this.goalsUrl, goal, this.httpOptions).pipe(
      tap((newGoal: Goal) => this.log(`added goal w/ id=${newGoal.id}`)),
      catchError(this.handleError<Goal>('addGoal'))
    );
  }

  /** DELETE: delete the goal from the server */
  deleteGoal(goal: Goal | number): Observable<Goal> {
    const id = typeof goal === 'number' ? goal : goal.id;
    const url = `${this.goalsUrl}/${id}`;

    return this.http.delete<Goal>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted goal id=${id}`)),
      catchError(this.handleError<Goal>('deleteGoal'))
    );
  }
  /** PUT: update the goal on the server */
  updateGoal(goal: Goal): Observable<any> {
    return this.http.put(this.goalsUrl, goal, this.httpOptions).pipe(
      tap(_ => this.log(`updated goal id=${goal.id}`)),
      catchError(this.handleError<any>('updateGoal'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a GoalService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`GoalService: ${message}`);
  }
}