import { Component, OnInit } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { AuthService } from '../service/auth.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {

  current_password: string = '';
  new_password: string = '';
  confirm_password: string = '';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  changePassword() {
    const token = this.authService.getToken();
    if (!token) {
      console.error("Token not found");
      return;
    }

    // Validate if new password matches confirm password
    if (this.new_password !== this.confirm_password) {
      console.error("New password and confirm password do not match");
      return;
    }

    // Prepare request headers
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json' // Assuming your API expects JSON
    });

    // Prepare request body
    const requestBody = {
      current_password: this.current_password,
      new_password: this.new_password,
      confirm_password: this.confirm_password
    };

    // Send HTTP PUT request to change password API
    this.http.put('http://127.0.0.1:8000/api/changePassword', requestBody, { headers }).subscribe(
      (response) => {
        console.log('Password changed successfully:', response);
        this.router.navigate(['/login'])
      },
      (error) => {
        console.error('Error changing password:', error);
        // Handle error response, such as displaying an error message to the user
      }
    );
  }

}
