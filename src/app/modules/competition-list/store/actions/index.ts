import {createAction, props} from '@ngrx/store';
import {ICompetitionListItem} from '@modules/competition-list/models';

export const loadCompetitionList = createAction(
  '[CompetitionList/API] Load Competition List'
);

export const competitionListLoaded = createAction(
  '[CompetitionList/API] Competition list loaded',
  props<{ competitionList: ICompetitionListItem[] }>()
);
