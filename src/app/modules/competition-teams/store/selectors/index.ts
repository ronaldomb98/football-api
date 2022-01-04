import {createFeatureSelector, createSelector} from '@ngrx/store';
import {adapter, competitionTeamsReducer} from '@modules/competition-teams/store/reducers';
import {ICompetitionTeamsState} from '@modules/competition-teams/models';

const { selectAll } = adapter.getSelectors();

export const featureSelector = createFeatureSelector<ICompetitionTeamsState>(competitionTeamsReducer.name);

export const selectAllCompetitionTeams = createSelector(featureSelector, selectAll);

export const selectCompetition = createSelector(featureSelector, (state) => state.competition);

export const selectSeason = createSelector(featureSelector, (state) => state.season);
