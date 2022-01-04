import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TeamRoutingModule} from './team-routing.module';
import {TeamComponent} from '@modules/team/components/team/team.component';
import {TeamService} from '@modules/team/services/team.service';
import {API_TOKEN_PROVIDER} from '@shared/services/token-header.interceptor';
import {CACHE_INTERCEPTOR_PROVIDER} from '@shared/services/cache.interceptor';
import {HttpClientModule} from '@angular/common/http';
import {StoreModule} from '@ngrx/store';
import {teamReducer} from '@modules/team/store/reducers';
import {EffectsModule} from '@ngrx/effects';
import {TeamEffects} from '@modules/team/store/effects/team.effects';
import {IonicModule} from '@ionic/angular';
import {SharedModule} from '@shared/shared.module';


@NgModule({
  declarations: [TeamComponent],
  imports: [
    CommonModule,
    IonicModule,
    SharedModule,
    TeamRoutingModule,
    HttpClientModule,
    StoreModule.forFeature(teamReducer),
    EffectsModule.forFeature([TeamEffects])
  ],
  providers: [
    TeamService,
    API_TOKEN_PROVIDER,
    CACHE_INTERCEPTOR_PROVIDER
  ]
})
export class TeamModule { }
