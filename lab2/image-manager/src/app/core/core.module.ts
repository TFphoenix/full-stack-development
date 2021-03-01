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

@NgModule({
  declarations: [
    // components
    HomeComponent,
    MainLayoutComponent,
    EmptyLayoutComponent,
    HeaderComponent,
  ],
  providers: [
    // services
    // guards
    // etc
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    RouterModule,
    HttpClientModule,
  ],
  exports: [MaterialModule, HomeComponent],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() core: CoreModule) {
    if (core) {
      throw new Error('Core module should be imported only in the root module');
    }
  }
}
