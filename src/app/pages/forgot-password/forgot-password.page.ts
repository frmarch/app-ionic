import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
  standalone: false
})
export class ForgotPasswordPage implements OnInit {
  onReset(email: string) {
    console.log('Solicitar recuperación para:', email);
  }

  constructor() { }

  ngOnInit() {
  }

}
