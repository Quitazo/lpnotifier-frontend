import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from "@angular/material/icon";

import { AppComponent } from './app.component';
import { ToolbarModule } from './components/toolbar/toolbar.module';
import { FooterModule } from './components/footer/footer.module';
import { PageNotFoundComponent } from "./pages/page-not-found/page-not-found.component";
import { HttpClientModule } from "@angular/common/http";
import { userService } from "./services/user.service";
import { RegisterUserComponent } from './pages/register-user/register-user.component';
import { HomeComponent } from "./pages/home/home.component";
import { AppRoutingModule } from "./app-routing.module";

@NgModule({
  declarations: [
    HomeComponent,
    AppComponent,
    ToolbarModule,
    FooterModule,
    PageNotFoundComponent,
    RegisterUserComponent
  ],
  imports: [
    BrowserModule,
    MatIconModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [userService],
  bootstrap: [AppComponent]
})
export class AppComponentModule { }
