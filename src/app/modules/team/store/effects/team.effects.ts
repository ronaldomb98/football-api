import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {TeamService} from '@modules/team/services/team.service';
import {loadTeam, teamFailed, teamLoaded} from '@modules/team/store/actions';
import {catchError, map, switchMap} from 'rxjs/operators';
import {ErrorsToastService} from '@shared/services/errors-toast.service';

@Injectable()
export class TeamEffects {

  loadTeam$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTeam.type),
      switchMap(({ id }) => this.teamService.getTeam(id).pipe(
        map((team) => teamLoaded({team})),
        catchError((error) => this.errorsToastService.notifyAndNavigateToRoot(error).pipe(
          map(() => teamFailed({ error }))
        ))
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private teamService: TeamService,
    private errorsToastService: ErrorsToastService
  ) {
  }
}
