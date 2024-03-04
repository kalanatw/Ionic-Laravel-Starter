import { Component } from '@angular/core';
import { AuthService } from './service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Login', url: 'login', icon: 'log-in' },
    { title: 'Profile', url: 'profile', icon: 'person' },
    { title: 'Signup', url: 'signup', icon: 'person-add' },
    { title: 'Forgot Password', url: 'forgot-password', icon: 'lock-open' },
    { title: 'Change Password', url: 'change-password', icon: 'lock-closed' },
 
  ];
  public showLogoutMenuItem: boolean = false;
  ngOnInit() {
    this.showLogoutMenuItem = this.appPages.some((p) => p.title === 'Login');
  }

  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
