import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastService } from '../service/toast.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  name: string = '';
  email: string = '';
  password: string = '';
  password_confirmation: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit() {}

  async signup() {
    const userData = {
      name: this.name,
      email: this.email,
      password: this.password,
      password_confirmation: this.password_confirmation,
    };

    const headers = new HttpHeaders()
      .set('Accept', 'application/vnd.api+json')
      .set('Content-Type', 'application/vnd.api+json');

    try {
      const response = await this.http
        .post('http://127.0.0.1:8000/api/register', userData, { headers })
        .toPromise();
      console.log('Signup successful:', response);
      this.toastService.presentToast('Sign up successful! Please log in.');
      this.router.navigate(['/login']);
    } catch (error: any) {
      this.toastService.presentToast('Signup failed:', error);
      let errorMessage = 'Signup failed.';

      if (error && error.error && error.error.message) {
        errorMessage = error.error.message;
      }

      this.toastService.presentToast(errorMessage);
    }
  }
}
