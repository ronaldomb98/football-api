import {adapter, competitionListReducer} from '@modules/competition-list/store/reducers';
import {competitionListLoaded} from '@modules/competition-list/store/actions';
import {competitionsListMock} from '@modules/competition-list/__test__/mocks';

describe('CompetitionListReducer', () => {

  it('should return default reducer state', () => {
    const initialState = adapter.getInitialState();
    const action = {
      type: 'Unknown',
    };

    const state = competitionListReducer.reducer(initialState, action);

    expect(state).toBe(initialState);
  });

  it('should provide competition list', () => {
    const initialState = adapter.getInitialState();
    const action = competitionListLoaded({ competitionList: competitionsListMock });

    const state = competitionListReducer.reducer(initialState, action);

    expect(state.ids.length).toBe(competitionsListMock.length);
  });
});
