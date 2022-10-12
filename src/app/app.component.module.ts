import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from "@angular/material/icon";

import { AppComponent } from './app.component';
import { ToolbarModule } from './toolbar/toolbar.module';
import { FooterModule } from './footer/footer.module';
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { HttpClientModule } from "@angular/common/http";
import { userService } from "./user.service";
import { RegisterUserComponent } from './register-user/register-user.component';
import {HomeComponent} from "./home/home.component";

// const routes: Routes = [
//   { path: '', component: AppComponent, pathMatch: 'full' },
//   { path: '**', component: PageNotFoundComponent }  // Wildcard route for a 404 page
//
// ];

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
    HttpClientModule
    // RouterModule.forRoot(routes, { useHash: true })
  ],
  providers: [userService],
  bootstrap: [AppComponent]
})
export class AppComponentModule { }
