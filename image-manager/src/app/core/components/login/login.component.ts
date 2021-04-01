import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hidePassword = true;
  email: string = '';
  password: string = '';

  constructor(private readonly _authService: AuthService, private readonly _router: Router) {}

  ngOnInit(): void {}

  login(loginForm: NgForm) {
    if (loginForm.valid) {
      this._authService.login(loginForm.value);
    }
  }
}
