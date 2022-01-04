import {createEntityAdapter, EntityAdapter} from '@ngrx/entity';
import {ICompetitionTeamsState, ITeam} from '@modules/competition-teams/models';
import {createFeature, createReducer, on} from '@ngrx/store';
import * as Actions from '../actions';

export const adapter: EntityAdapter<ITeam> = createEntityAdapter();

const initialState: ICompetitionTeamsState = adapter.getInitialState({
  competition: null,
  season: null
});

export const competitionTeamsReducer = createFeature({
  name: 'competitionTeams',
  reducer: createReducer(
    initialState,
    on(
      Actions.cleanCompetitionTeams,
      (state) => adapter.setAll([], { ...state, competition: null, season: null })
    ),
    on(
      Actions.competitionTeamsLoaded,
      (state, { competition, season, teams}) => adapter.setAll(teams, { ...state, competition, season })
    )
  )
});
