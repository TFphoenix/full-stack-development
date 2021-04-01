import { TestBed } from '@angular/core/testing';

import { LoginLogoutGuard } from './login-logout.guard';

describe('LoginLogoutGuard', () => {
  let guard: LoginLogoutGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LoginLogoutGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
