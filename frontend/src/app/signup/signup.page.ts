import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  username: string ='';
  email: string ='';
  password: string = '';
  password_confirmation: string = '';


  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  signup() {
    const userData = {
      name: this.username,
      email: this.email,
      password: this.password,
      password_confirmation: this.password_confirmation
    };

    const headers = new HttpHeaders()
      .set('Accept', 'application/vnd.api+json')
      .set('Content-Type', 'application/vnd.api+json');

    this.http.post('http://127.0.0.1:8000/api/register', userData, { headers })
      .subscribe((response) => {
        console.log('Signup successful:', response);
        this.router.navigate(['/login'])
        
        // Handle success, navigate to another page, show success message, etc.
      }, (error) => {
        console.error('Signup failed:', error);
        // Handle error, show error message, etc.
      });
  }
}
