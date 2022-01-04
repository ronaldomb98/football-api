import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'competition-list',
    loadChildren: () => import('@modules/competition-list/competition-list.module').then(m => m.CompetitionListModule)
  },
  {
    path: 'competition-teams/:id',
    loadChildren: () => import('@modules/competition-teams/competition-teams.module').then(m => m.CompetitionTeamsModule)
  },
  {
    path: 'team/:id',
    loadChildren: () => import('@modules/team/team.module').then(m => m.TeamModule)
  },
  {
    path: '',
    redirectTo: 'competition-list',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'competition-list'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
