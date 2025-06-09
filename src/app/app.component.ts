import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './services/auth.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false
})
export class AppComponent {
  showMenu = false;

  constructor(
    public menu: MenuController,
    private router: Router,
    private auth: AuthService
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const publicRoutes = ['/login', '/register', '/forgot-password'];
        this.showMenu = !publicRoutes.includes(event.url) && this.auth.isAuthenticated();
      }
    });
  }

  navigateTo(path: string) {
    this.menu.close();
    this.router.navigate([path]);
  }

  logout() {
    this.auth.logout();
    this.menu.close();
    this.router.navigate(['/login']);
  }
}
