import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
      flyInOut(),
      expand()
  ]
})
export class MenuComponent implements OnInit {

  dishes: Dish[];
  errMsg: string;

  // selectedDish: Dish;

  constructor(private dishService: DishService,
              @Inject('BASE_URL') private BASE_URL) { }

  ngOnInit() {
    // this.dishService.getDishes()
    //             .then((dishes) => this.dishes = dishes);
    this.dishService.getDishes()
                .subscribe((dishes) => this.dishes = dishes,
                errMsg => this.errMsg = <any>errMsg);
  }

  // onSelect(dish: Dish) {
  //   // this.selectedDish = dish;
  // }

}


