import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NavComponent } from './nav/nav.component';
import { AuthComponent } from './user/auth/auth.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { OrdersComponent } from './orders/orders.component';
import { AuditComponent } from './audit/audit.component';

const routes: Routes = [
  // { path: '', component: AuthComponent, pathMatch: 'full'},
  { path: '', component: HomeComponent, pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'audit', component: AuditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
