import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { faArrowRightFromBracket, faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-successful-logged',
  templateUrl: './successful-logged.component.html',
  animations: [
    trigger('successLogin', [
      state('open', style({ opacity: 1 })),
      transition('* => *', [animate('2s')]),
    ]),
    trigger('outline', [
      state('open', style({ outline: '100rem solid #1565C0' })),
      transition('* => *', [
        animate(
          '1s',
          keyframes([
            style({ outline: '10rem solid #1565C0' }),
            style({ outline: '50rem solid #1565C0' }),
            style({ outline: '100rem solid #1565C0' }),
          ])
        ),
      ]),
    ]),
  ],
  styleUrls: ['./successful-logged.component.sass'],
})
export class SuccessfulLoggedComponent implements OnInit, OnDestroy {
  @Input() logged: boolean = false;
  @Output() logout: EventEmitter<boolean> = new EventEmitter();
  @Input() person!: any;
  modeSpinner: ProgressSpinnerMode = 'indeterminate';
  checkIcon = faCheck;
  exitIcon = faArrowRightFromBracket;
  constructor(private router: Router) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.modeSpinner = 'determinate';
    }, 500);
  }

  logOut() {
    sessionStorage.clear();
    this.logout.emit(true);
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {}
}
