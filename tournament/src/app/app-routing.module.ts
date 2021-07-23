import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateTournamentComponent } from './components/create-tournament/create-tournament.component';
import { TournamentComponent } from './components/tournament/tournament.component';


const routes: Routes = [
  {path: '', component: CreateTournamentComponent},
  {path: 'tournament', component: TournamentComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
