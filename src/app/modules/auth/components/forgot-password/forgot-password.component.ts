import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { first } from 'rxjs/operators';
import {UserService} from "../../../../_services/user.service";
import {Router} from "@angular/router";

enum ErrorStates {
  NotSubmitted,
  HasError,
  NoError,
}

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: UntypedFormGroup;
  errorState: ErrorStates = ErrorStates.NotSubmitted;
  errorStates = ErrorStates;
  isLoading$: Observable<boolean>;

  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
  constructor(private fb: UntypedFormBuilder, private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.forgotPasswordForm.controls;
  }

  initForm() {
    this.forgotPasswordForm = this.fb.group({
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.minLength(3),
          Validators.maxLength(320), // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
        ]),
      ],
    });
  }

  submit() {
    this.userService
      .forgotPassword(this.forgotPasswordForm.value.email).subscribe(
        (response: any) => {
          console.log(response);
        if(response == true){
          this.router.navigate(['/auth/login', ], { queryParams: { message: 'Email de recuperação enviado, acesse sua caixa de mensagens!' } });
        }else{
          this.router.navigate(['/auth/login', ], { queryParams: { message: 'Aconteceu algum erro, verifique os dados e tente novamente!' } });
        }
        // this.cancelar();
        // this.ngOnInit();
      },
      errorResponse => {
        console.log(errorResponse)
      }
    )
  }
}
