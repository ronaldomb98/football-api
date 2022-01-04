import {createAction, props} from '@ngrx/store';
import {ITeam} from '@modules/team/models';
import {HttpErrorResponse} from '@angular/common/http';

export const loadTeam = createAction(
  '[Team/API] Load Team',
  props<{ id: string }>()
);

export const teamLoaded = createAction(
  '[Team/API] Team Loaded',
  props<{ team: ITeam }>()
);

export const teamFailed = createAction(
  '[Team/API] Team Failed',
  props<{ error: HttpErrorResponse }>()
);

export const cleanTeam = createAction(
  '[Team/API] Clean Team'
);
