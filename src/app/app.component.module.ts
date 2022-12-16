import { NgModule } from '@angular/core';

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from './app.component';
import { FooterModule } from './components/footer/footer.module';
import { HomeComponent } from "./pages/home/home.component";
import { LoginComponent } from './pages/login/login.component';
import { PageNotFoundComponent } from "./pages/page-not-found/page-not-found.component";
import { RegisterComponent } from './pages/register/register.component';
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
import { UserHomeComponent } from './pages/userPages/user-home/user-home.component';
import { authInterceptorProviders } from "./services/auth.interceptor";
import { DashboardComponent } from './pages/adminPages/dashboard/dashboard.component';
import { UserDashboardComponent } from './pages/userPages/user-dashboard/user-dashboard.component';
import { ProfileComponent } from './pages/adminPages/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarModule,
    FooterModule,
    HomeComponent,
    PageNotFoundComponent,
    RegisterComponent,
    LoginComponent,
    UserHomeComponent,
    DashboardComponent,
    UserDashboardComponent,
    ProfileComponent,
  ],
    imports: [
        AppRoutingModule,
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
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
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppComponentModule { }
