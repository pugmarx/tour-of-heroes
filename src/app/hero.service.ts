import { Injectable } from '@angular/core';
import { Student } from './hero';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { MessageService } from './message.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class HeroService {

  constructor(private http: HttpClient, private messageService: MessageService) { }

  private heroesUrl = 'api/heroes';  // URL to web api


  getHeroes(): Observable<Student[]>{
  	return this.http.get<Student[]>(this.heroesUrl)
  	.pipe(
  			 tap(heroes => this.log(`fetched heroes`)),
        	catchError(this.handleError('getHeroes', []))
  		);
  }


  /*Get Hero by Id*/
  getHero(id: number): Observable<Student>{
  	const url = `${this.heroesUrl}/${id}`;
  	return this.http.get<Student>(url).pipe(
  		tap(_=> this.log(`fetched hero id=${id}`)),
  		catchError(this.handleError<Student>(`getHero id=${id}`))
  	);
  }


  private log(message: string){
  	this.messageService.add('HeroService: '+ message);
  }


addHero (hero: Student): Observable<Student> {
  return this.http.post<Student>(this.heroesUrl, hero, httpOptions).pipe(
    tap((hero: Student) => this.log(`added hero w/ id=${hero.id}`)),
    catchError(this.handleError<Student>('addHero'))
  );
}

  updateHero(hero: Student): Observable<any>{
  	return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
  		tap(_ => this.log(`updated hero id=${hero.id}`)),
  		catchError(this.handleError<any>('updateHero'))
  	);
  }


/** DELETE: delete the hero from the server */
deleteHero (hero: Student | number): Observable<Student> {
  const id = typeof hero === 'number' ? hero : hero.id;
  const url = `${this.heroesUrl}/${id}`;

  return this.http.delete<Student>(url, httpOptions).pipe(
    tap(_ => this.log(`deleted hero id=${id}`)),
    catchError(this.handleError<Student>('deleteHero'))
  );
}


/* GET heroes whose name contains search term */
searchHeroes(term: string): Observable<Student[]> {
  if (!term.trim()) {
    // if not search term, return empty hero array.
    return of([]);
  }
  return this.http.get<Student[]>(`api/heroes/?name=${term}`).pipe(
    tap(_ => this.log(`found heroes matching "${term}"`)),
    catchError(this.handleError<Student[]>('searchHeroes', []))
  );
}

/**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

}