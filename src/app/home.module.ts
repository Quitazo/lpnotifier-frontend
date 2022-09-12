import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from "@angular/material/icon";

import { HomeComponent } from './home.component';
import { ToolbarModule } from './toolbar/toolbar.module';
import { FooterModule } from './footer/footer.module';
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import {HttpClientModule} from "@angular/common/http";
import {userService} from "./user.service";

// const routes: Routes = [
//   { path: '', component: HomeComponent, pathMatch: 'full' },
//   { path: '**', component: PageNotFoundComponent }  // Wildcard route for a 404 page
//
// ];

@NgModule({
  declarations: [
    HomeComponent,
    ToolbarModule,
    FooterModule,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    MatIconModule,
    HttpClientModule
    // RouterModule.forRoot(routes, { useHash: true })
  ],
  providers: [userService],
  bootstrap: [HomeComponent]
})
export class HomeModule { }
