import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { Location } from '@angular/common';
import { Params, ActivatedRoute } from '@angular/router';
import { DishService } from '../services/dish.service';

@Component({
  selector: 'app-dish-detail',
  templateUrl: './dish-detail.component.html',
  styleUrls: ['./dish-detail.component.scss']
})
export class DishDetailComponent implements OnInit {

  // @Input()
  dish: Dish;
    
  constructor(private dishService: DishService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.dish = this.dishService.getDish(id);
    // console.log(this.dish);
  }

  goBack(): void {
    this.location.back();
  }

}
