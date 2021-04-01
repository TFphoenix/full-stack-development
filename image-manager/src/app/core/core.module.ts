import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../modules/material/material.module';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './components/home/home.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { EmptyLayoutComponent } from './layouts/empty-layout/empty-layout.component';
import { HeaderComponent } from './components/header/header.component';
import { LogoutComponent } from './components/logout/logout.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { LoginLogoutGuard } from './guards/login-logout/login-logout.guard';
import { AuthService } from './services/auth/auth.service';
import { RequestService } from './services/request/request.service';

@NgModule({
  declarations: [
    // components
    HomeComponent,
    MainLayoutComponent,
    EmptyLayoutComponent,
    HeaderComponent,
    LogoutComponent,
    LoginComponent
  ],
  providers: [
    // services
    AuthService,
    RequestService,
    // guards
    AuthGuard,
    LoginLogoutGuard
    // etc
  ],
  imports: [CommonModule, SharedModule, MaterialModule, RouterModule, HttpClientModule],
  exports: [MaterialModule, HomeComponent]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() core: CoreModule) {
    if (core) {
      throw new Error('Core module should be imported only in the root module');
    }
  }
}
