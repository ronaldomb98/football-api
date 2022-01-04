import {createAction, props} from '@ngrx/store';
import {ICompetition, ISeason, ITeam} from '@modules/competition-teams/models';
import {HttpErrorResponse} from '@angular/common/http';

export const loadCompetitionTeams = createAction(
  '[CompetitionTeams/API] Load Competition Teams',
  props<{ id: string }>()
);

export const competitionTeamsLoaded = createAction(
  '[CompetitionTeams/API] Competition Teams Loaded',
  props<{
    competition: ICompetition;
    season: ISeason;
    teams: ITeam[];
  }>()
);

export const competitionTeamsFailed = createAction(
  '[CompetitionTeams/API] Competition Teams Failed',
  props<{ error: HttpErrorResponse }> ()
);

export const cleanCompetitionTeams = createAction(
  '[CompetitionTeams/API] Clean Competition Teams'
);
