import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContestComponent } from './components/contest/contest.component';
import { HomeComponent } from './components/home/home.component';
import { AppGuard } from './guard/app.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'contest', component: ContestComponent, canActivate: [AppGuard] },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
