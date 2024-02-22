import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { loginGuard } from './pages/login/login.guard';
import { UsersComponent } from './pages/users/users.component';

export const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [loginGuard],
  },
  {
    path: "users",
    component: UsersComponent,
    canActivate: [loginGuard],
  },
];
