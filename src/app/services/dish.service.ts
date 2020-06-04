import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }

  getDishes(): Dish[] {
    return DISHES;
  }

  getDish(id: string): Dish {
    for(let i = 0;i<DISHES.length;i++) {
      if(DISHES[i].id === id) {
        // console.log('Found: ', DISHES[i])
        return DISHES[i];
      }
    }
    // return DISHES.filter((dish) => {
    //   dish.id === id;
    // })[0];
    // return DISHES[id];
  }

  getFeaturedDish(): Dish {
    return DISHES.filter((dish) => dish.featured)[0];
  }
}
