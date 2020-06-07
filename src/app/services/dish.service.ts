import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }

  // getDishes(): Promise<Dish[]> {
    getDishes(): Observable<Dish[]> {
    // return of(DISHES).pipe(delay(2000)).toPromise();
    return of(DISHES).pipe(delay(2000));
    // return new Promise(resolve => {
        // Simulate server latency with 2 seconds delay
    //     setTimeout(() => resolve(DISHES), 2000)
    // });
  }

  // getDish(id: string): Promise<Dish> {
    getDish(id: string): Observable<Dish> {
    for(let i = 0;i<DISHES.length;i++) {
      if(DISHES[i].id === id) {
        // console.log('Found: ', DISHES[i])
        return of(DISHES[i]).pipe(delay(2000));
        // return of(DISHES[i]).pipe(delay(2000)).toPromise();
        // return new Promise(resolve => {
        //   setTimeout(()=> resolve(DISHES[i]), 2000)
        // });
        // return Promise.resolve(DISHES[i]);
      }
    }
    // return DISHES.filter((dish) => {
    //   dish.id === id;
    // })[0];
    // return DISHES[id];
  }

  // getFeaturedDish(): Promise<Dish> {
    getFeaturedDish(): Observable<Dish> {
      return of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000));
    // return of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000)).toPromise();
    // return new Promise(resolve => {
    //   setTimeout(()=> resolve(DISHES.filter((dish) => dish.featured)[0]), 2000)
    // });
    // return Promise.resolve(DISHES.filter((dish) => dish.featured)[0]);
  }
}
