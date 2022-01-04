import {initialState, teamReducer} from '@modules/team/store/reducers';
import {teamMockResponse} from '@modules/team/__tests__/mocks';
import {cleanTeam, teamLoaded} from '@modules/team/store/actions';
import {selectTeam} from "@modules/team/store/selectors";

describe('TeamReducer', () => {

  it('should return default team reducer state', () => {
    const action = {
      type: 'Unknown',
    };

    const state = teamReducer.reducer(initialState, action);

    expect(state).toBe(initialState);
  });

  it('should provide team information', () => {
    const team = teamMockResponse;
    const action = teamLoaded({team});

    const state = teamReducer.reducer(initialState, action);

    expect(state).toEqual(team);
    expect(selectTeam.projector(state)).toEqual(team);
  });

  it('should clean competition team state', () => {
    const action = cleanTeam();

    const state = teamReducer.reducer(initialState, action);

    expect(state).toEqual(initialState);
    expect(state).not.toBe(initialState);
  });
});
