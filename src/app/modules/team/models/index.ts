export interface IArea {
  id: number;
  name: string;
}

export interface IActiveCompetition {
  id: number;
  area: IArea;
  name: string;
  code: string;
  plan: string;
  lastUpdated: string;
}

export interface ISquad {
  id: number;
  name: string;
  position: string;
  dateOfBirth: string;
  countryOfBirth: string;
  nationality: string;
  shirtNumber?: number;
  role: string;
}

export interface ITeam {
  id: number;
  area: IArea;
  activeCompetitions: IActiveCompetition[];
  name: string;
  shortName: string;
  tla: string;
  crestUrl: string;
  address: string;
  phone: string;
  website: string;
  email: string;
  founded: number;
  clubColors: string;
  venue: string;
  squad: ISquad[];
  lastUpdated: string;
}

export type ITeamState = ITeam;
