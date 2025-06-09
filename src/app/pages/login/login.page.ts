import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage {
  constructor(private auth: AuthService, private router: Router) {}

onLogin(credentials: { email: string; password: string }) {

  this.auth.login();
  this.router.navigate(['/home']);
}

}
