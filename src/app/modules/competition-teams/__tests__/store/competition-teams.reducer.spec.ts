import {adapter, competitionTeamsReducer} from '@modules/competition-teams/store/reducers';
import {cleanCompetitionTeams, competitionTeamsLoaded} from '@modules/competition-teams/store/actions';
import {teamsMockResponse} from '@modules/competition-teams/__tests__/mocks';
import {selectCompetition, selectSeason} from '@modules/competition-teams/store/selectors';

describe('CompetitionTeamsReducer', () => {

  it('should return default reducer state', () => {
    const initialState = adapter.getInitialState({
      competition: null,
      season: null
    });
    const action = {
      type: 'Unknown',
    };

    const state = competitionTeamsReducer.reducer(initialState, action);

    expect(state).toBe(initialState);
  });

  it('should provide competition team list', () => {
    const initialState = adapter.getInitialState({
      competition: null,
      season: null
    });
    const {teams, competition, season} = teamsMockResponse;
    const action = competitionTeamsLoaded({teams, competition, season});

    const state = competitionTeamsReducer.reducer(initialState, action);

    expect(state.ids.length).toBe(teams.length);
    expect(selectCompetition.projector(state)).toEqual(state.competition);
    expect(selectSeason.projector(state)).toEqual(state.season);
  });

  it('should clean competition team state', () => {
    const initialState = adapter.getInitialState({
      competition: null,
      season: null
    });
    const action = cleanCompetitionTeams();

    const state = competitionTeamsReducer.reducer(initialState, action);

    expect(state).toEqual(initialState);
    expect(state).not.toBe(initialState);
  });
});
