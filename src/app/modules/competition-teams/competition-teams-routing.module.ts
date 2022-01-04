import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CompetitionTeamsComponent} from '@modules/competition-teams/components/competition-teams/competition-teams.component';

const routes: Routes = [
  {
    path: '',
    component: CompetitionTeamsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompetitionTeamsRoutingModule { }
