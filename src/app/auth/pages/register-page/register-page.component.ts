import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { RegisterServiceService } from '../../services/register-service.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private registerService = inject(RegisterServiceService);

  public myForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confPassword: ['', [Validators.required, Validators.minLength(6)]],
    name: ['', [Validators.required]],
  });

  register() {
    const { email, password, name, confPassword } = this.myForm.value;

    if (password === confPassword) {
      this.registerService.register(email, password, name).subscribe({
        next: () => {
          Swal.fire('Excelente', 'Registro de manera exitosa', 'success');
          this.router.navigateByUrl('/dashboard');
        },
        error: (message) => {
          Swal.fire('Error', message, 'error');
        },
      });
    } else {
      Swal.fire(
        'Error',
        'Las contrase;as no coinciden revisa de nuevo',
        'error'
      );
    }
  }
}
