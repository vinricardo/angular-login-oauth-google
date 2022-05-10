import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { faAt, faAtlas, faUnlockKeyhole } from '@fortawesome/free-solid-svg-icons';

import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  animations: [
    trigger('successLogin', [
      state('open', style({ opacity: 0, transform: 'rotateY(90deg)' })),
      transition('* => *', [animate('.5s')]),
    ]),
  ],
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {
  homeIcon = faAtlas;
  atIcon = faAt;
  lockIcon = faUnlockKeyhole;

  logged: boolean = false;
  redirectToRegisterPage: boolean = false;
  messageErrorLocally: string = '';
  person!: any;
  form!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  changeColorIconOnFocus(iconName: string, option: string) {
    let htmlElement: HTMLElement = document
      .getElementsByClassName(iconName)
      .item(0) as HTMLElement;
    htmlElement.style.color = option == 'in' ? '#1565C0' : '#ADADAD';
  }

  loginWithGoogle(): void {
    this.authService.signInWithGoogle();
  }

  loginLocally(): void {
    let personCreated = JSON.parse(sessionStorage.getItem('user_created')!);
    if (
      personCreated &&
      this.form.get('email')!.value == personCreated.email &&
      this.form.get('password')!.value == personCreated.password
    ) {
      this.logged = true;
      this.person = personCreated;
    } else this.messageErrorLocally = 'Not possible sign in';
  }

  logout(event: any) {
    if (event) this.logged = false;
  }

  getSignUpBack(event: any) {
    if (event) this.redirectToRegisterPage = false;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [''],
      password: [''],
    });
    this.authService.verifyAccessToken();
    this.logged = this.authService.isAuthenticated;
    this.authService.getPersonalInfo().subscribe(
      (res) => {
        this.logged = true;
        this.person = res;
      },
      (res) => {
        let personCreated = JSON.parse(sessionStorage.getItem('user_created')!);
        if (!personCreated) {
          this.router.navigate(['/login']);
          sessionStorage.clear();
        } else {
          this.logged = true;
          this.person = personCreated;
        }
      }
    );
  }
}
