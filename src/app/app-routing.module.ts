import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./pages/principalPages/home/home.component";
import {RegisterComponent} from "./pages/principalPages/register/register.component";
import {LoginComponent} from "./pages/principalPages/login/login.component";
import {DashboardComponent} from "./pages/adminPages/dashboard/dashboard.component";
import {AdminGuard} from "./services/admin.guard";
import {NormalGuard} from "./services/normal.guard";
import {PageNotFoundComponent} from "./pages/principalPages/page-not-found/page-not-found.component";
import {AdminProfileComponent} from "./pages/adminPages/admin-profile/admin-profile.component";
import {UserProfileComponent} from "./pages/user-pages/user-profile/user-profile.component";
import {UserHomeComponent} from "./pages/user-pages/user-home/user-home.component";
import {UserDashboardComponent} from "./pages/user-pages/user-dashboard/user-dashboard.component";


const principalRoutes: Routes = [
  {
    path:'signup',
    component:RegisterComponent,
    pathMatch:'full'
  },
  {
    path:'login',
    component:LoginComponent,
    pathMatch:'full'
  },
  {
    path:'admin',
    component:DashboardComponent,
    pathMatch:'full',
    canActivate:[AdminGuard],
  },
  {
    path: 'admin/profile',
    pathMatch:'full',
    component: AdminProfileComponent,
    canActivate:[AdminGuard],
  },
  {
    path:'user',
    pathMatch:'full',
    component: UserDashboardComponent,
    canActivate:[NormalGuard],
  },
  {
    path: 'user/home',
    pathMatch:'full',
    component: UserHomeComponent,
    canActivate:[NormalGuard],
  },
  {
    path: 'user/profile',
    pathMatch:'full',
    component: UserProfileComponent,
    canActivate:[NormalGuard],
  },
  {
    path:'',
    component:HomeComponent,
    pathMatch:'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(principalRoutes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
