import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(private router: Router, private authService:AuthService) {}

  ngOnInit() {}
  email: string = '';
  password: string = '';

  goToSignupPage() {
    this.router.navigate(['/signup'])
  }

  forgotPassword() {
   this.router.navigate(['/forgot-password'])
  }
  login() {
    this.authService.login({ email: this.email, password: this.password })
    .subscribe(
      () => {
        // Navigate to profile page upon successful login
        this.router.navigate(['/profile']);
      },
      (error) => {
        console.log('Login failed:', error);
        // Handle login error (e.g., display error message to user)
      }
    );
  }
}
