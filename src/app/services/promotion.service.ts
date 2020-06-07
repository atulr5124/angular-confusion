import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }

  // getPromotions(): Promise<Promotion[]> {
    getPromotions(): Observable<Promotion[]> {
    // return of(PROMOTIONS).pipe(delay(2000)).toPromise();
    return of(PROMOTIONS).pipe(delay(2000));
    // return new Promise(resolve => {
    //   setTimeout(() => resolve(PROMOTIONS), 2000);
    // });
    // return Promise.resolve(PROMOTIONS);
  }

  // getDish(id: string): Promise<Promotion> {
  getDish(id: string): Observable<Promotion> {
    // return of(PROMOTIONS.filter((promotion) => {
    //   promotion.id === id
    // })[0]).pipe(delay(2000)).toPromise();
    return of(PROMOTIONS.filter((promotion) => {
      promotion.id === id
    })[0]).pipe(delay(2000));
    // return new Promise(resolve => {
    //   setTimeout(() => resolve(PROMOTIONS.filter((promotion) => {
    //     promotion.id === id
    //   })[0]), 2000);
    // });
    // return Promise.resolve(PROMOTIONS.filter((promotion) => {
    //   promotion.id === id
    // })[0]);
  }

  // getFeaturedPromotion(): Promise<Promotion> {
    getFeaturedPromotion(): Observable<Promotion> {
    // return of(PROMOTIONS.filter((promotion) => promotion.featured)[0]).pipe(delay(2000)).toPromise();
    return of(PROMOTIONS.filter((promotion) => promotion.featured)[0]).pipe(delay(2000));
    // return new Promise(resolve => {
    //   setTimeout(() => resolve(PROMOTIONS.filter((promotion) => promotion.featured)[0]), 2000);
    // });
    // return Promise.resolve(PROMOTIONS.filter((promotion) => promotion.featured)[0]);
  }
}
