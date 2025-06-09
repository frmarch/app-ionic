import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false
})
export class RegisterPage implements OnInit {

  onRegister(data: { name: string, email: string, password: string }) {
  console.log('Registro recibido:', data);
  }


  constructor() { }

  ngOnInit() {
  }

}
