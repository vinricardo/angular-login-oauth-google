import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  animations: [
    trigger('transition', [
      state(
        'open',
        style({
          width: '20px',
          borderRadius: '35%',
          opacity: 0.8,
        })
      ),
      state(
        'closed',
        style({
          width: '10px',
        })
      ),
      transition('* => *', [animate('.5s')]),
    ]),
  ],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.sass'],
})
export class CarouselComponent implements OnInit {
  messages: any = {
    0: {
      title: 'Change The Quality Of Your Life',
      description:
        'A balanced diet and smart stats will fill your life with happiness and joy.',
    },
    1: {
      title: 'Easy To Navigate And Earn Rewards',
      description:
        'Now you can make reservations and compete against other users.',
    },
    2: {
      title: 'New Sheduling And Routing Options',
      description: 'We also  updated the format of podcasts and rewards.',
    },
  };
  index: number = 0;
  actualMessage = this.messages[this.index];
  constructor() {}

  ngOnInit(): void {
    setInterval(() => {
      this.index == 3 ? (this.index = 0) : this.index;
      this.actualMessage = this.messages[`${this.index}`];
      this.index++;
    }, 2000);
  }
}
