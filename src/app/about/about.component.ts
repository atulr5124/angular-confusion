import { Component, OnInit, Inject } from '@angular/core';
import { LeaderService } from '../services/leader.service';
import { Leader } from '../shared/leader';
import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class AboutComponent implements OnInit {

  leaders: Leader[];
  errMsg: string;

  constructor(private leaderService: LeaderService, @Inject('BASE_URL') private BASE_URL) { }

  ngOnInit() {
    // this.leaderService.getLeaders()
    //       .then((leaders) => this.leaders = leaders);
    this.leaderService.getLeaders()
      .subscribe((leaders) => this.leaders = leaders,
                  errMsg => this.errMsg = <any> errMsg);
  }

}
