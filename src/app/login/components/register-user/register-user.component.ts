import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faAt, faPerson, faUnlockKeyhole } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.sass'],
})
export class RegisterUserComponent implements OnInit, OnDestroy {
  atIcon = faAt;
  lockIcon = faUnlockKeyhole;
  userIcon = faPerson;

  form!: FormGroup;
  @Output() successfulSignUp: EventEmitter<boolean> = new EventEmitter();
  showSuccessfulSignUp: boolean = false;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: [null, Validators.required],
      password: [null, [Validators.minLength(3), Validators.required]],
      email: [
        null,
        [Validators.minLength(3), Validators.required, Validators.email],
      ],
    });
  }

  changeColorIconOnFocus(iconName: string, option: string) {
    let htmlElement: HTMLElement = document
      .getElementsByClassName(iconName)
      .item(0) as HTMLElement;
    htmlElement.style.color =
      option == 'in'
        ? '#1565C0'
        : option == 'out'
        ? '#ADADAD'
        : option == 'error'
        ? '#F44336'
        : '';
  }

  getErrorMessage(controlName: string, iconName: string) {
    if (this.form.get(controlName)!.hasError('required')) {
      this.changeColorIconOnFocus(iconName, 'error');
      return 'You must enter a value';
    }

    if (this.form.get(controlName)!.hasError('email')) {
      this.changeColorIconOnFocus(iconName, 'error');
      return 'Not a valid email';
    }
    return null;
  }

  createUser() {
    sessionStorage.setItem('user_created', JSON.stringify(this.form.value));
    this.showSuccessfulSignUp = true;
  }

  goBackToLogin() {
    this.successfulSignUp.emit(true);
  }

  ngOnDestroy(): void {}
}
