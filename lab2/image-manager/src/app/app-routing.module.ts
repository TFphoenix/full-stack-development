import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './core/components/home/home.component';
import { EmptyLayoutComponent } from './core/layouts/empty-layout/empty-layout.component';
import { MainLayoutComponent } from './core/layouts/main-layout/main-layout.component';

const routes: Routes = [
  // main layout routes
  {
    path: '',
    component: MainLayoutComponent,
    canActivateChild: [], //REMEMBER: Here will general guards be declared (like EULA, SIGN-UP, etc.)
    children: [
      {
        path: '',
        component: HomeComponent,
        pathMatch: 'full',
      },
      // {
      //   path: 'dashboard',
      //   loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)
      // }
    ],
  },
  // empty layout routes
  {
    path: '',
    component: EmptyLayoutComponent,
    children: [
      // {
      //   path: 'landing',
      //   component: LandingComponent,
      //   pathMatch: 'full',
      // },
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
