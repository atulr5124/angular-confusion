import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }

  getDishes(): Promise<Dish[]> {
    return new Promise(resolve => {
        // Simulate server latency with 2 seconds delay
        setTimeout(() => resolve(DISHES), 2000)
    });
  }

  getDish(id: string): Promise<Dish> {
    for(let i = 0;i<DISHES.length;i++) {
      if(DISHES[i].id === id) {
        // console.log('Found: ', DISHES[i])
        return new Promise(resolve => {
          setTimeout(()=> resolve(DISHES[i]), 2000)
        });
        // return Promise.resolve(DISHES[i]);
      }
    }
    // return DISHES.filter((dish) => {
    //   dish.id === id;
    // })[0];
    // return DISHES[id];
  }

  getFeaturedDish(): Promise<Dish> {
    return new Promise(resolve => {
      setTimeout(()=> resolve(DISHES.filter((dish) => dish.featured)[0]), 2000)
    });
    // return Promise.resolve(DISHES.filter((dish) => dish.featured)[0]);
  }
}
