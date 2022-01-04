import {createFeature, createReducer, on} from '@ngrx/store';
import * as Actions from '@modules/team/store/actions';
import {ITeamState} from '@modules/team/models';

export const initialState: ITeamState = {
  id: null,
  area: {
    id: null,
    name: ''
  },
  activeCompetitions: [],
  name: '',
  shortName: '',
  tla: '',
  crestUrl: '',
  address: '',
  phone: '',
  website: '',
  email: '',
  founded: null,
  clubColors: '',
  venue: '',
  squad: [],
  lastUpdated: ''
};

export const teamReducer = createFeature({
  name: 'teamData',
  reducer: createReducer(
    initialState,
    on(
      Actions.cleanTeam,
      () => ({ ...initialState})
    ),
    on(
      Actions.teamLoaded,
      (state, {team}) => ({ ...team })
    )
  )
});
