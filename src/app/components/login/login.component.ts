import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  errorMessage: string = '';
  loginForm: FormGroup;

  constructor(private authService: AuthService, private router: Router,  private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
   }

  login(): void {
    if(this.loginForm.valid){
      const { username, password } = this.loginForm.value;
    if (!this.authService.login(username, password)) {
      this.errorMessage = 'Invalid username or password';
    }else {
      this.router.navigate(['/admin']);
    }
  }
  else{
    this.errorMessage = "Please fill out form correctly";
  }
}

  cancel(): void {
    this.router.navigate(['/']);
  }
}
