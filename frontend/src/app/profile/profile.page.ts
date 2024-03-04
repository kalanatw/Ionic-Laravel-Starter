import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    const token = this.authService.getToken();
    if (token) {
      this.loadProfileData();
    } else {
      this.router.navigate(['/login']);
    }
  }
  initialUserData: any = {};
  userData: any = {};
  isEditMode = false;
  isToastOpen = false;
  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }
  loadProfileData() {
    const token = this.authService.getToken();
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });

      this.http
        .get<any>('http://127.0.0.1:8000/api/viewProfile', { headers })
        .subscribe(
          (response) => {
            this.userData = response.data.user;
            this.initialUserData = { ...this.userData };
            console.log(this.userData.email);
          },
          (error) => {
            console.error('Error loading profile data:', error);
          }
        );
    }
  }

  saveChanges() {
    const token = this.authService.getToken();
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });

      // Send updated user data to the backend
      this.http
        .put<any>('http://127.0.0.1:8000/api/editUser', this.userData, {
          headers,
        })
        .subscribe(
          (response) => {
            console.log('Changes saved:', response);
            this.toggleEditMode();
            this.setOpen(true);
          },
          (error) => {
            console.error('Error saving changes:', error);
          }
        );
    }
  }
  isDataChanged(): boolean {
    return (
      JSON.stringify(this.userData) !== JSON.stringify(this.initialUserData)
    );
  }
}
