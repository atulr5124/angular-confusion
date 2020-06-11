import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { LeaderService } from '../services/leader.service';
import { Leader } from '../shared/leader';
import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class HomeComponent implements OnInit {

  dish: Dish;
  dishErrMsg: string;
  promErrMsg: string;
  leadErrmsg: string;
  promotion: Promotion;
  featuredLeader: Leader;

  constructor(private dishService: DishService,
    private promotionService: PromotionService,
    private leaderService: LeaderService,
    @Inject('BASE_URL') private BASE_URL) { }

  ngOnInit() {
    // this.dishService.getFeaturedDish()
    //             .then((dish) => this.dish =dish);
    this.dishService.getFeaturedDish()
      .subscribe((dish) => this.dish = dish,
        dishErrMsg => this.dishErrMsg = dishErrMsg);
    // this.promotionService.getFeaturedPromotion()
    //     .then((promotion) => this.promotion = promotion);
    this.promotionService.getFeaturedPromotion()
      .subscribe((promotion) => this.promotion = promotion);
    // this.leaderService.getFeaturedLeader()
    //                       .then((featuredLeader) => this.featuredLeader = featuredLeader);
    this.leaderService.getFeaturedLeader()
      .subscribe((featuredLeader) => this.featuredLeader = featuredLeader);
  }

}
