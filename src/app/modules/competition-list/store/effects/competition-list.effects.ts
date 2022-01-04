import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {competitionListLoaded, loadCompetitionList} from '@modules/competition-list/store/actions';
import {map, switchMap} from 'rxjs/operators';
import {CompetitionListService} from '@modules/competition-list/services/competition-list.service';

@Injectable()
export class CompetitionListEffects {
  loadEffects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCompetitionList.type),
      switchMap(() => this.competitionListService.competitions()),
      map((response) => response.competitions),
      map((competitionList) => competitionListLoaded({competitionList}))
    ));

  constructor(
    private actions$: Actions,
    private competitionListService: CompetitionListService
  ) {
  }
}
