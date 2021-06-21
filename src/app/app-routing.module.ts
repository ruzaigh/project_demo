import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from 'src/navbar/navbar.component';
import { LoginComponent } from 'src/pages/login/login.component';
import { HomePageComponent } from 'src/pages/page-not-found/home-page/home-page.component';
import { PageNotFoundComponent } from 'src/pages/page-not-found/page-not-found.component';
import { SignUpComponent } from 'src/pages/sign-up/sign-up.component';

const routes: Routes = [
  {path: '', redirectTo: '/home-page', pathMatch: 'full'},
  {path: 'home-page', component: HomePageComponent},
  {path: 'navbar', component: NavbarComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'login', component: LoginComponent},
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
