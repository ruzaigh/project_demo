import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from 'src/auth/auth/auth.component';
import { NavbarComponent } from 'src/navbar/navbar.component';
import { CoolFactsComponent } from 'src/pages/cool-facts/cool-facts.component';
import { FoodComponent } from 'src/pages/food/food.component';
import { GamesComponent } from 'src/pages/games/games.component';
import { HomePageComponent } from 'src/pages/page-not-found/home-page/home-page.component';
import { PageNotFoundComponent } from 'src/pages/page-not-found/page-not-found.component';
import { SportComponent } from 'src/pages/sport/sport.component';

const routes: Routes = [
  {path: '', redirectTo: '/home-page', pathMatch: 'full'},
  {path: 'auth', component: AuthComponent},
  {path: 'home-page', component: HomePageComponent},
  {path: 'navbar', component: NavbarComponent},
  {path: 'food', component: FoodComponent},
  {path: 'sport', component: SportComponent},
  {path: 'games', component: GamesComponent},
  {path: 'cool-facts', component: CoolFactsComponent},
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
