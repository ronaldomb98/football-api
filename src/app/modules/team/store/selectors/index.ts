import {createFeatureSelector, createSelector} from '@ngrx/store';
import {teamReducer} from '@modules/team/store/reducers';
import {ITeam} from '@modules/team/models';

export const featureSelector = createFeatureSelector<ITeam>(teamReducer.name);

export const selectTeam = createSelector(featureSelector, (state) => state);
