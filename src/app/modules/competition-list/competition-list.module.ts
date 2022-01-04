import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CompetitionListService} from './services/competition-list.service';
import {
  CompetitionListComponent
} from './components/competition-list/competition-list.component';
import {CompetitionItemComponent} from './components/competition-item/competition-item.component';
import {IonicModule} from '@ionic/angular';
import {CompetitionListRoutingModule} from './competition-list-routing.module';
import {EffectsModule} from '@ngrx/effects';
import {CompetitionListEffects} from '@modules/competition-list/store/effects/competition-list.effects';
import {StoreModule} from '@ngrx/store';
import {competitionListReducer} from '@modules/competition-list/store/reducers';
import {SharedModule} from '@shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicInputMaskModule} from '@thiagoprz/ionic-input-mask';

@NgModule({
  declarations: [CompetitionListComponent, CompetitionItemComponent],
  imports: [
    CommonModule,
    IonicModule,
    SharedModule,
    CompetitionListRoutingModule,
    FormsModule,
    IonicInputMaskModule,
    ReactiveFormsModule,
    StoreModule.forFeature(competitionListReducer),
    EffectsModule.forFeature([CompetitionListEffects])
  ],
  providers: [CompetitionListService],
  exports: [CompetitionListComponent, CompetitionItemComponent]
})
export class CompetitionListModule { }
