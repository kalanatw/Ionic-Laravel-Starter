import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { ToastService } from '../service/toast.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  current_password: string = '';
  new_password: string = '';
  confirm_password: string = '';
  token: string | null = null;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.token = this.authService.getToken();
    if (!this.token) {
      this.toastService.presentToast('Please Login to continue');
      this.router.navigate(['/login']);
      return;
    }
  }
  changePassword() {
    // Validate if new password matches confirm password
    if (this.new_password !== this.confirm_password) {
      this.toastService.presentToast(
        'New password and confirm password do not match'
      );
      return;
    }

    // Prepare request headers
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json', // Assuming your API expects JSON
    });

    // Prepare request body
    const requestBody = {
      current_password: this.current_password,
      new_password: this.new_password,
      confirm_password: this.confirm_password,
    };

    // Send HTTP PUT request to change password API
    this.http
      .put('http://127.0.0.1:8000/api/changePassword', requestBody, { headers })
      .subscribe(
        (response) => {
          console.log('Password change response:', response); // Log the response object
          this.toastService.presentToast('Password changed successfully');
          this.router.navigate(['/login']);
        },
        (error: any) => {
          console.error(error.error.message);
          this.toastService.presentToast(error.error.message);
          // Handle error response, such as displaying an error message to the user
        }
      );
  }
}
