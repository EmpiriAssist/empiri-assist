import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from '../message.service';

import { Abstract } from '../abstract';


@Injectable({ providedIn: 'root' })
export class AbstractService {

  private abstractsUrl = 'api/abstracts';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET abstracts from the server */
  getAbstracts(): Observable<Abstract[]> {
    return this.http.get<Abstract[]>(this.abstractsUrl)
      .pipe(
        tap(_ => this.log('fetched abstracts')),
        catchError(this.handleError<Abstract[]>('getAbstracts', []))
      );
  }

  /** GET hero by id. Return `undefined` when id not found */
  getAbstractNo404<Data>(id: number): Observable<Abstract> {
    const url = `${this.abstractsUrl}/?id=${id}`;
    return this.http.get<Abstract[]>(url)
      .pipe(
        map(abstracts => abstracts[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} abstract id=${id}`);
        }),
        catchError(this.handleError<Abstract>(`getAbstract id=${id}`))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getAbstract(id: number): Observable<Abstract> {
    const url = `${this.abstractsUrl}/${id}`;
    return this.http.get<Abstract>(url).pipe(
      tap(_ => this.log(`fetched abstract id=${id}`)),
      catchError(this.handleError<Abstract>(`getAbstract id=${id}`))
    );
  }

  /* GET heroes whose name contains search term */
  searchAbstracts(term: string): Observable<Abstract[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Abstract[]>(`${this.abstractsUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found abstracts matching "${term}"`) :
         this.log(`no abstracts matching "${term}"`)),
      catchError(this.handleError<Abstract[]>('searchAbstracts', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new hero to the server */
  addAbstract(abstract: Abstract): Observable<Abstract> {
    return this.http.post<Abstract>(this.abstractsUrl, abstract, this.httpOptions).pipe(
      tap((newAbstract: Abstract) => this.log(`added abstract w/ id=${newAbstract.id}`)),
      catchError(this.handleError<Abstract>('addAbstract'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteAbstract(abstract: Abstract | number): Observable<Abstract> {
    const id = typeof abstract === 'number' ? abstract : abstract.id;
    const url = `${this.abstractsUrl}/${id}`;

    return this.http.delete<Abstract>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted abstract id=${id}`)),
      catchError(this.handleError<Abstract>('deleteAbstract'))
    );
  }
  /** PUT: update the hero on the server */
  updateAbstract(abstract: Abstract): Observable<any> {
    return this.http.put(this.abstractsUrl, abstract, this.httpOptions).pipe(
      tap(_ => this.log(`updated abstract id=${abstract.id}`)),
      catchError(this.handleError<any>('updateAbstract'))
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
    this.messageService.add(`AbstractService: ${message}`);
  }
}