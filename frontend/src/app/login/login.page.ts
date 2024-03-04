import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { ToastService } from '../service/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private toastService: ToastService
  ) {}

  ngOnInit() {}
  email: string = '';
  password: string = '';
  message: string = '';

  goToSignupPage() {
    this.router.navigate(['/signup']);
  }

  forgotPassword() {
    this.router.navigate(['/forgot-password']);
  }
  async login() {
    try {
      await this.authService
        .login({ email: this.email, password: this.password })
        .toPromise();
      this.toastService.presentToast('Successfuly logged in');
      this.router.navigate(['/profile']);
    } catch (error: any) {
      console.log(error);
      const errorMessage = error.message;
      this.toastService.presentToast(errorMessage);
    }
  }
}
