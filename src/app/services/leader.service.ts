import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASE_URL } from '../shared/baseurl'; 
import { map, catchError } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

  // getLeaders(): Promise<Leader[]> {
  getLeaders(): Observable<Leader[]> {
    // return of(LEADERS).pipe(delay(2000));
    // return of(LEADERS).pipe(delay(2000)).toPromise();
    // return new Promise(resolve => {
    //   setTimeout(() => resolve(LEADERS), 2000);
    // });
    // return Promise.resolve(LEADERS);
    return this.http.get<Leader[]>(BASE_URL + 'leadership')
            .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  // getFeaturedLeader(): Promise<Leader> {
  getFeaturedLeader(): Observable<Leader> {
    // return of(LEADERS.filter((leader) => leader.featured)[0]).pipe(delay(2000));
    // return of(LEADERS.filter((leader) => leader.featured)[0]).pipe(delay(2000)).toPromise();
    // return new Promise(resolve => {
    //   setTimeout(() => resolve(LEADERS.filter((leader) => leader.featured)[0]), 2000);
    // });
    // return Promise.resolve(LEADERS.filter((leader) => leader.featured)[0]);
    return this.http.get<Leader>(BASE_URL + 'leadership?featured=true')
            .pipe(map(leaders => leaders[0]))
            .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
