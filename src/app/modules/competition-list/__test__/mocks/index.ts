import {ICompetitionListItem} from "@modules/competition-list/models";

export const competitionsListMock: ICompetitionListItem[] = [
  {
    id: 2006,
    area: {
      id: 2001,
      name: 'Africa',
      countryCode: 'AFR',
      ensignUrl: null
    },
    name: 'WC Qualification CAF',
    code: 'QCAF',
    emblemUrl: null,
    plan: 'TIER_FOUR',
    currentSeason: {
      id: 555,
      startDate: '2019-09-04',
      endDate: '2021-11-16',
      currentMatchday: 6,
      winner: null
    },
    numberOfAvailableSeasons: 2,
    lastUpdated: '2021-11-11T10:27:41Z'
  },
  {
    id: 2023,
    area: {
      id: 2011,
      name: 'Argentina',
      countryCode: 'ARG',
      ensignUrl: null
    },
    name: 'Primera B Nacional',
    code: null,
    emblemUrl: null,
    plan: 'TIER_FOUR',
    currentSeason: {
      id: 716,
      startDate: '2021-03-13',
      endDate: '2021-12-26',
      currentMatchday: 17,
      winner: null
    },
    numberOfAvailableSeasons: 5,
    lastUpdated: '2021-04-17T11:21:38Z'
  },
  {
    id: 2024,
    area: {
      id: 2011,
      name: 'Argentina',
      countryCode: 'ARG',
      ensignUrl: null
    },
    name: 'Liga Profesional',
    code: 'ASL',
    emblemUrl: 'https://crests.football-data.org/LPDF.svg',
    plan: 'TIER_TWO',
    currentSeason: {
      id: 715,
      startDate: '2001-01-05',
      endDate: '2001-01-10',
      currentMatchday: 25,
      winner: null
    },
    numberOfAvailableSeasons: 4,
    lastUpdated: '2021-05-28T18:02:40Z'
  },
  {
    id: 20222,
    area: {
      id: 20111,
      name: 'Not current dates',
      countryCode: 'ARG',
      ensignUrl: null
    },
    name: 'Liga Profesional',
    code: 'ASL',
    emblemUrl: 'https://crests.football-data.org/LPDF.svg',
    plan: 'TIER_TWO',
    currentSeason: {
      id: 7155,
      startDate: null,
      endDate: null,
      currentMatchday: 25,
      winner: null
    },
    numberOfAvailableSeasons: 4,
    lastUpdated: '2021-05-28T18:02:40Z'
  },
  {
    id: 202223,
    area: {
      id: 201111,
      name: 'Not current object',
      countryCode: 'ARG',
      ensignUrl: null
    },
    name: 'Liga Profesional',
    code: 'ASL',
    emblemUrl: 'https://crests.football-data.org/LPDF.svg',
    plan: 'TIER_TWO',
    currentSeason: null,
    numberOfAvailableSeasons: 4,
    lastUpdated: '2021-05-28T18:02:40Z'
  },
  {
    id: 2022233,
    area: {
      id: 201111,
      name: 'Partial date',
      countryCode: 'ARG',
      ensignUrl: null
    },
    name: 'Liga Profesional',
    code: 'ASL',
    emblemUrl: 'https://crests.football-data.org/LPDF.svg',
    plan: 'TIER_TWO',
    currentSeason: {
      id: 715,
      startDate: '2001',
      endDate: '2001-01',
      currentMatchday: 25,
      winner: null
    },
    numberOfAvailableSeasons: 4,
    lastUpdated: '2021-05-28T18:02:40Z'
  },
  {
    id: 20222335,
    area: {
      id: 2011115,
      name: 'Wrong date',
      countryCode: 'ARG',
      ensignUrl: null
    },
    name: 'Liga Profesional',
    code: 'ASL',
    emblemUrl: 'https://crests.football-data.org/LPDF.svg',
    plan: 'TIER_TWO',
    currentSeason: {
      id: 715,
      startDate: '',
      endDate: '',
      currentMatchday: 25,
      winner: null
    },
    numberOfAvailableSeasons: 4,
    lastUpdated: '2021-05-28T18:02:40Z'
  }
];

export const competitionMockResponse = {
  count: 0,
  filters: {},
  competitions: [
    {
      id: 2006,
      area: {
        id: 2001,
        name: 'Africa',
        countryCode: 'AFR',
        ensignUrl: null
      },
      name: 'WC Qualification CAF',
      code: 'QCAF',
      emblemUrl: null,
      plan: 'TIER_FOUR',
      currentSeason: {
        id: 555,
        startDate: '2019-09-04',
        endDate: '2021-11-16',
        currentMatchday: 6,
        winner: null
      },
      numberOfAvailableSeasons: 2,
      lastUpdated: '2021-11-11T10:27:41Z'
    },
  ]
};
