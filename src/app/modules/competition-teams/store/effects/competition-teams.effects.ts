import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {
  competitionTeamsFailed,
  competitionTeamsLoaded,
  loadCompetitionTeams
} from '@modules/competition-teams/store/actions';
import {catchError, map, switchMap} from 'rxjs/operators';
import {CompetitionTeamsService} from '@modules/competition-teams/services/competition-teams.service';
import {ErrorsToastService} from '@shared/services/errors-toast.service';

@Injectable()
export class CompetitionTeamsEffects {

  loadCompetitionTeams$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCompetitionTeams.type),
      switchMap(({id}) => this.competitionTeamsService.getTeams(id).pipe(
        map(({teams, competition, season}) => competitionTeamsLoaded({competition, teams, season})),
        catchError(error => this.errorsToastService.notifyAndNavigateToRoot(error).pipe(
          map(() => competitionTeamsFailed({ error })))
        )
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private competitionTeamsService: CompetitionTeamsService,
    private errorsToastService: ErrorsToastService
  ) {
  }


}
