import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { CarouselComponent } from '../shared/components/carousel/carousel.component';
import { SuccessfulLoggedComponent } from '../shared/components/successful-logged/successful-logged.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

@NgModule({
  declarations: [
    LoginComponent,
    CarouselComponent,
    SuccessfulLoggedComponent,
    RegisterUserComponent,
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    FontAwesomeModule,
  ],
})
export class LoginModule {}
