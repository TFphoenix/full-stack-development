import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './core/components/home/home.component';
import { LoginComponent } from './core/components/login/login.component';
import { LogoutComponent } from './core/components/logout/logout.component';
import { AuthGuard } from './core/guards/auth/auth.guard';
import { LoginLogoutGuard } from './core/guards/login-logout/login-logout.guard';
import { EmptyLayoutComponent } from './core/layouts/empty-layout/empty-layout.component';
import { MainLayoutComponent } from './core/layouts/main-layout/main-layout.component';

const routes: Routes = [
  // main layout routes
  {
    path: '',
    component: MainLayoutComponent,
    canActivateChild: [AuthGuard], //REMEMBER: Here will general guards be declared (like EULA, SIGN-UP, etc.)
    children: [
      {
        path: '',
        component: HomeComponent,
        pathMatch: 'full',
      },
      {
        path: 'images',
        loadChildren: () =>
          import('./modules/images/images.module').then((m) => m.ImagesModule),
      },
    ],
  },
  // empty layout routes
  {
    path: '',
    component: EmptyLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
        pathMatch: 'full',
        canActivate: [LoginLogoutGuard],
      },
      {
        path: 'logout',
        component: LogoutComponent,
        pathMatch: 'full',
        canActivate: [LoginLogoutGuard],
      },
    ],
  },
  // no layout routes
  { path: '**', redirectTo: '/' }, // all unhandled routes redirect to this
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
