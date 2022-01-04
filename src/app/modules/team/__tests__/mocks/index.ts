import {ITeam} from '@modules/team/models';

export const teamMockResponse: ITeam = {
  id: 802,
  area: {
    id: 2246,
    name: 'Tunisia'
  },
  activeCompetitions: [],
  name: 'Tunisia',
  shortName: 'Tunisia',
  tla: 'TUN',
  crestUrl: 'https://crests.football-data.org/tunisia.svg',
  address: 'Stade Annexe d\'El Menzah Tunis 1003',
  phone: '+216 (71) 793760',
  website: 'http://www.ftf.org.tn',
  email: 'directeur@ftf.org.tn',
  founded: 1957,
  clubColors: 'White / Red',
  venue: null,
  squad: [
    {
      id: 3176,
      name: 'Matthias Ginter',
      position: 'Defender',
      dateOfBirth: '1994-01-19T00:00:00Z',
      countryOfBirth: 'Germany',
      nationality: 'Germany',
      shirtNumber: null,
      role: 'PLAYER'
    }
  ],
  lastUpdated: '2021-11-19T09:14:14Z'
};
