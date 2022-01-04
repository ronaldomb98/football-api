import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CompetitionTeamsRoutingModule} from './competition-teams-routing.module';
import {StoreModule} from '@ngrx/store';
import {competitionTeamsReducer} from '@modules/competition-teams/store/reducers';
import {EffectsModule} from '@ngrx/effects';
import {CompetitionTeamsEffects} from '@modules/competition-teams/store/effects/competition-teams.effects';
import {IonicModule} from '@ionic/angular';
import {CompetitionTeamsService} from '@modules/competition-teams/services/competition-teams.service';
import {CompetitionTeamsComponent} from '@modules/competition-teams/components/competition-teams/competition-teams.component';
import {API_TOKEN_PROVIDER} from '@shared/services/token-header.interceptor';
import {HttpClientModule} from '@angular/common/http';
import {CompetitionTeamItemComponent} from '@modules/competition-teams/components/competition-team-item/competition-team-item.component';
import {CACHE_INTERCEPTOR_PROVIDER} from '@shared/services/cache.interceptor';
import {SharedModule} from '@shared/shared.module';

@NgModule({
  declarations: [CompetitionTeamsComponent, CompetitionTeamItemComponent],
  imports: [
    CommonModule,
    IonicModule,
    SharedModule,
    CompetitionTeamsRoutingModule,
    StoreModule.forFeature(competitionTeamsReducer),
    EffectsModule.forFeature([CompetitionTeamsEffects]),
    HttpClientModule
  ],
  providers: [CompetitionTeamsService, API_TOKEN_PROVIDER, CACHE_INTERCEPTOR_PROVIDER]
})
export class CompetitionTeamsModule { }
