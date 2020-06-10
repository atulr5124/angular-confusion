import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASE_URL } from '../shared/baseurl'; 
import { map, catchError } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http: HttpClient,
              private processHTTPMsgService: ProcessHTTPMsgService) { }

  // getDishes(): Promise<Dish[]> {
    getDishes(): Observable<Dish[]> {
    // return of(DISHES).pipe(delay(2000)).toPromise();
    // return of(DISHES).pipe(delay(2000));
    // return new Promise(resolve => {
        // Simulate server latency with 2 seconds delay
    //     setTimeout(() => resolve(DISHES), 2000)
    // });
    return this.http.get<Dish[]>(BASE_URL+'dishes')
          .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  // getDish(id: string): Promise<Dish> {
    getDish(id: string): Observable<Dish> {
    // for(let i = 0;i<DISHES.length;i++) {
    //   if(DISHES[i].id === id) {
    //     // console.log('Found: ', DISHES[i])
    //     return of(DISHES[i]).pipe(delay(2000));
    //     // return of(DISHES[i]).pipe(delay(2000)).toPromise();
    //     // return new Promise(resolve => {
    //     //   setTimeout(()=> resolve(DISHES[i]), 2000)
    //     // });
    //     // return Promise.resolve(DISHES[i]);
    //   }
    // }
    // return DISHES.filter((dish) => {
    //   dish.id === id;
    // })[0];
    // return DISHES[id];
    return this.http.get<Dish>(BASE_URL + 'dishes/' + id)
          .pipe(catchError(this.processHTTPMsgService.handleError));

  }

  // getFeaturedDish(): Promise<Dish> {
    getFeaturedDish(): Observable<Dish> {
      return this.http.get<Dish>(BASE_URL+'dishes?featured=true')
          .pipe(map(dishes => dishes[0]))
          .pipe(catchError(this.processHTTPMsgService.handleError));
      // return of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000));
    // return of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000)).toPromise();
    // return new Promise(resolve => {
    //   setTimeout(()=> resolve(DISHES.filter((dish) => dish.featured)[0]), 2000)
    // });
    // return Promise.resolve(DISHES.filter((dish) => dish.featured)[0]);
  }

  getDishIds(): Observable<string[] | any> {
    return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)))
          .pipe(catchError(error => error));
    // return of(DISHES.map(dish => dish.id)).pipe(delay(2000));
  }

  putDish(dish: Dish): Observable<Dish> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }; 
    return this.http.put<Dish>(BASE_URL+'dishes/'+dish.id, dish, httpOptions)
        .pipe(catchError(this.processHTTPMsgService.handleError)); 
  }
}
