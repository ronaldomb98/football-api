import {createFeature, createReducer, on} from '@ngrx/store';
import {createEntityAdapter, EntityAdapter} from '@ngrx/entity';
import {ICompetitionListItem} from '../../models';
import * as Actions from '../actions';

export const adapter: EntityAdapter<ICompetitionListItem> = createEntityAdapter<ICompetitionListItem>();

const initialState = adapter.getInitialState();

export const competitionListReducer = createFeature({
  name: 'competitionList',
  reducer: createReducer(
    initialState,
    on(
      Actions.competitionListLoaded,
      (state, { competitionList }) => adapter.setAll(competitionList, state)
    )
  )
});

