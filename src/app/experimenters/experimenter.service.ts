import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from '../message.service';

import { Experimenter } from '../experimenter';


@Injectable({ providedIn: 'root' })
export class ExperimenterService {

  private experimentersUrl = 'api/experimenters';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET experimenters from the server */
  getExperimenters(): Observable<Experimenter[]> {
    return this.http.get<Experimenter[]>(this.experimentersUrl)
      .pipe(
        tap(_ => this.log('fetched experimenters')),
        catchError(this.handleError<Experimenter[]>('getExperimenters', []))
      );
  }

  /** GET experimenter by id. Return `undefined` when id not found */
  getExperimenterNo404<Data>(id: number): Observable<Experimenter> {
    const url = `${this.experimentersUrl}/?id=${id}`;
    return this.http.get<Experimenter[]>(url)
      .pipe(
        map(experimenters => experimenters[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} experimenter id=${id}`);
        }),
        catchError(this.handleError<Experimenter>(`getExperimenter id=${id}`))
      );
  }

  /** GET experimenter by id. Will 404 if id not found */
  getExperimenter(id: number): Observable<Experimenter> {
    const url = `${this.experimentersUrl}/${id}`;
    return this.http.get<Experimenter>(url).pipe(
      tap(_ => this.log(`fetched experimenter id=${id}`)),
      catchError(this.handleError<Experimenter>(`getExperimenter id=${id}`))
    );
  }

  /* GET experimenteres whose name contains search term */
  searchExperimenters(term: string): Observable<Experimenter[]> {
    if (!term.trim()) {
      // if not search term, return empty experimenter array.
      return of([]);
    }
    return this.http.get<Experimenter[]>(`${this.experimentersUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found experimenters matching "${term}"`) :
         this.log(`no experimenters matching "${term}"`)),
      catchError(this.handleError<Experimenter[]>('searchExperimenters', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new experimenter to the server */
  addExperimenter(experimenter: Experimenter): Observable<Experimenter> {
    return this.http.post<Experimenter>(this.experimentersUrl, experimenter, this.httpOptions).pipe(
      tap((newExperimenter: Experimenter) => this.log(`added experimenter w/ id=${newExperimenter.id}`)),
      catchError(this.handleError<Experimenter>('addExperimenter'))
    );
  }

  /** DELETE: delete the experimenter from the server */
  deleteExperimenter(experimenter: Experimenter | number): Observable<Experimenter> {
    const id = typeof experimenter === 'number' ? experimenter : experimenter.id;
    const url = `${this.experimentersUrl}/${id}`;

    return this.http.delete<Experimenter>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted experimenter id=${id}`)),
      catchError(this.handleError<Experimenter>('deleteExperimenter'))
    );
  }
  /** PUT: update the experimenter on the server */
  updateExperimenter(experimenter: Experimenter): Observable<any> {
    return this.http.put(this.experimentersUrl, experimenter, this.httpOptions).pipe(
      tap(_ => this.log(`updated experimenter id=${experimenter.id}`)),
      catchError(this.handleError<any>('updateExperimenter'))
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

  /** Log a ExperimenterService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`ExperimenterService: ${message}`);
  }
}