import { NgModule } from '@angular/core';

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from './app.component';
import { FooterModule } from './components/footer/footer.module';
import { HomeComponent } from "./pages/home/home.component";
import { LoginComponent } from './pages/login/login.component';
import { PageNotFoundComponent } from "./pages/page-not-found/page-not-found.component";
import { RegisterComponent } from './pages/register/register.component';
import { ToolbarModule } from './components/toolbar/toolbar.module';
import { userService } from "./services/user.service";

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from "@angular/material/menu";
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from "@angular/forms";
import {MatPaginatorModule} from "@angular/material/paginator";
import { TablePaginatorComponent } from './components/table-paginator/table-paginator.component';
import {MatSortModule} from "@angular/material/sort";

@NgModule({
  declarations: [
    AppComponent,
    ToolbarModule,
    FooterModule,
    HomeComponent,
    PageNotFoundComponent,
    RegisterComponent,
    LoginComponent,
    TablePaginatorComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatTableModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  providers: [userService],
  bootstrap: [AppComponent]
})
export class AppComponentModule { }
