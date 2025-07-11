import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {

  username: string = '';
  password: string = '';
  isRegisterMode: boolean = false; // 🔁 Login/Register toggle

  constructor(private auth: AuthService, private router: Router, private http: HttpClient) {}

  toggleMode() {
    this.isRegisterMode = !this.isRegisterMode;
  }

  onSubmit() {
    if (this.isRegisterMode) {
      this.register();
    } else {
      this.login();
    }
  }

  login() {
    this.auth.login(this.username, this.password).subscribe({
      next: (res: any) => {
        this.auth.setToken(res.token);
        this.router.navigate(['/books']);
      },
      error: () => {
        alert('Login failed');
      }
    });
  }

  register() {
    this.http.post('http://localhost:8080/api/auth/register', {
      username: this.username,
      password: this.password,
      role: 'USER'
    }).subscribe({
      next: () => {
        alert('Registration successful! Now log in.');
        this.isRegisterMode = false;
        this.username = '';
        this.password = '';
      },
      error: () => {
        alert('Registration failed. Try a different username.');
      }
    });
  }
}