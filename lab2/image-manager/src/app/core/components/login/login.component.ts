import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hidePassword = true;

  constructor(private readonly _authService: AuthService, private readonly _router: Router) {}

  ngOnInit(): void {}

  login() {
    this._authService.isUserAuthenticated = true;
    this._router.navigate(['/']);
  }
}
