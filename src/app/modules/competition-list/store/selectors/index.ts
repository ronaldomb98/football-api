import {adapter, competitionListReducer} from '@modules/competition-list/store/reducers';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {ICompetitionListState} from '@modules/competition-list/models';

const {
  selectAll
} = adapter.getSelectors();

export const featureSelector = createFeatureSelector<ICompetitionListState>(competitionListReducer.name);

export const selectAllCompetitions = createSelector(featureSelector, selectAll);
