import { NgModule } from '@angular/core';

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from './app.component';
import { FooterModule } from './components/footer/footer.module';
import { HomeComponent } from "./pages/principalPages/home/home.component";
import { LoginComponent } from './pages/principalPages/login/login.component';
import { PageNotFoundComponent } from "./pages/principalPages/page-not-found/page-not-found.component";
import { RegisterComponent } from './pages/principalPages/register/register.component';
import { ToolbarModule } from './components/toolbar/toolbar.module';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from "@angular/material/menu";
import { MatTableModule } from '@angular/material/table';
import { MatGridListModule } from "@angular/material/grid-list";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatSortModule } from "@angular/material/sort";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { UserHomeComponent } from './pages/user-pages/user-home/user-home.component';
import { authInterceptorProviders } from "./services/auth.interceptor";
import { DashboardComponent } from './pages/adminPages/dashboard/dashboard.component';
import { UserDashboardComponent } from './pages/user-pages/user-dashboard/user-dashboard.component';
import { AdminProfileComponent } from './pages/adminPages/admin-profile/admin-profile.component';
import { UserProfileComponent } from './pages/user-pages/user-profile/user-profile.component';
import { VerifyComponent } from './pages/principalPages/verify/verify.component';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarModule,
    FooterModule,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    UserHomeComponent,
    DashboardComponent,
    UserDashboardComponent,
    AdminProfileComponent,
    UserProfileComponent,
    PageNotFoundComponent,
    VerifyComponent,
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatTableModule,
    MatGridListModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatSortModule,
    MatSnackBarModule,
  ],
  providers: [
    authInterceptorProviders,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppComponentModule { }
