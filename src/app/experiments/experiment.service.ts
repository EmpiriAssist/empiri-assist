import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from '../message.service';

import { Experiment } from '../experiment';
import { Experimenter } from '../experimenter';


@Injectable({ providedIn: 'root' })
export class ExperimentService {

  private experimentsUrl = 'api/experiments';  // URL to web api
  private experimentersUrl = 'api/experimenters';  // URL to web api
  
  experimenters: Experimenter[] = [];

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET experiments from the server */
  getExperiments(): Observable<Experiment[]> {
    return this.http.get<Experiment[]>(this.experimentsUrl)
      .pipe(
        tap(_ => this.log('fetched experiments')),
        catchError(this.handleError<Experiment[]>('getExperiments', []))
      );
  }

  /** GET hero by id. Return `undefined` when id not found */
  getExperimentNo404<Data>(id: number): Observable<Experiment> {
    const url = `${this.experimentsUrl}/?id=${id}`;
    return this.http.get<Experiment[]>(url)
      .pipe(
        map(experiments => experiments[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} experiment id=${id}`);
        }),
        catchError(this.handleError<Experiment>(`getExperiment id=${id}`))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getExperiment(id: number): Observable<Experiment> {
    const url = `${this.experimentsUrl}/${id}`;
    return this.http.get<Experiment>(url).pipe(
      tap(_ => this.log(`fetched experiment id=${id}`)),
      catchError(this.handleError<Experiment>(`getExperiment id=${id}`))
    );
  }

  /* GET heroes whose name contains search term */
  searchExperiments(term: string): Observable<Experiment[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Experiment[]>(`${this.experimentsUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found experiments matching "${term}"`) :
         this.log(`no experiments matching "${term}"`)),
      catchError(this.handleError<Experiment[]>('searchExperiments', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new hero to the server */
  addExperiment(experiment: Experiment): Observable<Experiment> {
    return this.http.post<Experiment>(this.experimentsUrl, experiment, this.httpOptions).pipe(
      tap((newExperiment: Experiment) => this.log(`added experiment w/ id=${newExperiment.id}`)),
      catchError(this.handleError<Experiment>('addExperiment'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteExperiment(experiment: Experiment | number): Observable<Experiment> {
    const id = typeof experiment === 'number' ? experiment : experiment.id;
    const url = `${this.experimentsUrl}/${id}`;

    return this.http.delete<Experiment>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted experiment id=${id}`)),
      catchError(this.handleError<Experiment>('deleteExperiment'))
    );
  }
  /** PUT: update the hero on the server */
  updateExperiment(experiment: Experiment): Observable<any> {
    return this.http.put(this.experimentsUrl, experiment, this.httpOptions).pipe(
      tap(_ => this.log(`updated experiment id=${experiment.id}`)),
      catchError(this.handleError<any>('updateExperiment'))
    );
  }

  //////// Experimenter methods //////////

  getExperimenters() {
    return this.experimenters;
  }

  addExperimenter(experimenter: Experimenter) {
    this.experimenters.push(experimenter);
  }

  deleteExperimenter(experimenter: Experimenter | number): Observable<Experiment> {
    const id = typeof experimenter === 'number' ? experimenter : experimenter.id;
    const url = `${this.experimentersUrl}/${id}`;

    return this.http.delete<Experiment>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted experimenter id=${id}`)),
      catchError(this.handleError<Experiment>('deleteExperimenter'))
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

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`ExperimentService: ${message}`);
  }
}