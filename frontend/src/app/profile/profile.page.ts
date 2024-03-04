import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastService } from '../service/toast.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    const token = this.authService.getToken();
    if (token) {
      this.loadProfileData();
    } else {
      this.toastService.presentToast('Please login ..');
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
          },
          (error) => {
            this.toastService.presentToast('Error loading profile data');
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

      this.http
        .put<any>('http://127.0.0.1:8000/api/editUser', this.userData, {
          headers,
        })
        .subscribe(
          (response) => {
            this.toastService.presentToast('Changes saved succesfully..');
            this.toggleEditMode();
          },
          (error) => {
            this.toastService.presentToast('Error saving changes:', error);
          }
        );
    }
  }
  isDataChanged(): boolean {
    return (
      JSON.stringify(this.userData) !== JSON.stringify(this.initialUserData)
    );
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.uploadImage(file);
    }
  }
  uploadImage(file: File) {
    const formData: FormData = new FormData();
    formData.append('image', file, file.name);

    const token = this.authService.getToken();
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });

      this.http
        .post<any>('http://127.0.0.1:8000/api/uploadProfileImage', formData, {
          headers,
        })
        .subscribe(
          (response) => {
            // Update the profile image URL in userData
            this.userData.profileImage = response.data.imageUrl;
          },
          (error) => {
            console.error('Error uploading profile image:', error);
          }
        );
    }
  }
}
