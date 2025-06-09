import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password-form',
  templateUrl: './forgot-password-form.component.html',
  styleUrls: ['./forgot-password-form.component.scss'],
  standalone: false
})
export class ForgotPasswordFormComponent {
  forgotForm: FormGroup;

  @Output() reset = new EventEmitter<string>();

  constructor(private fb: FormBuilder) {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  submit() {
    if (this.forgotForm.invalid) {
      this.forgotForm.markAllAsTouched();
      return;
    }
    this.reset.emit(this.forgotForm.value.email);
  }

  get email() { return this.forgotForm.get('email'); }
}
