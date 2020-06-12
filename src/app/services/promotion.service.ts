import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASE_URL } from '../shared/baseurl';
import { map, catchError } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { Dish } from '../shared/dish';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http:HttpClient,
              private processHTTPMsgService: ProcessHTTPMsgService) { }

  // getPromotions(): Promise<Promotion[]> {
    getPromotions(): Observable<Promotion[]> {
    // return of(PROMOTIONS).pipe(delay(2000)).toPromise();
    // return of(PROMOTIONS).pipe(delay(2000));
    // return new Promise(resolve => {
    //   setTimeout(() => resolve(PROMOTIONS), 2000);
    // });
    // return Promise.resolve(PROMOTIONS);
    return this.http.get<Promotion[]>(BASE_URL + 'promotions')
            .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  // getDish(id: string): Promise<Promotion> {
  getDish(id: string): Observable<Promotion> {
    // return of(PROMOTIONS.filter((promotion) => {
    //   promotion.id === id
    // })[0]).pipe(delay(2000)).toPromise();
    // return of(PROMOTIONS.filter((promotion) => {
    //   promotion.id === id
    // })[0]).pipe(delay(2000));
    // return new Promise(resolve => {
    //   setTimeout(() => resolve(PROMOTIONS.filter((promotion) => {
    //     promotion.id === id
    //   })[0]), 2000);
    // });
    // return Promise.resolve(PROMOTIONS.filter((promotion) => {
    //   promotion.id === id
    // })[0]);
    return this.http.get<Promotion>(BASE_URL + 'promotions/' +id)
            .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  // getFeaturedPromotion(): Promise<Promotion> {
    getFeaturedPromotion(): Observable<Promotion> {
    // return of(PROMOTIONS.filter((promotion) => promotion.featured)[0]).pipe(delay(2000)).toPromise();
    // return of(PROMOTIONS.filter((promotion) => promotion.featured)[0]).pipe(delay(2000));
    // return new Promise(resolve => {
    //   setTimeout(() => resolve(PROMOTIONS.filter((promotion) => promotion.featured)[0]), 2000);
    // });
    // return Promise.resolve(PROMOTIONS.filter((promotion) => promotion.featured)[0]);
    return this.http.get<Promotion>(BASE_URL + 'promotions?featured=true')
          .pipe(map(promotions => promotions[0]))
          .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
