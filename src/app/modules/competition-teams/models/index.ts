import {EntityState} from '@ngrx/entity';

export interface IArea {
  id: number;
  name: string;
}

export interface ICompetition {
  id: number;
  area: IArea;
  name: string;
  code: string;
  plan: string;
  lastUpdated: string;
}

export interface IWinner {
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crestUrl: string;
}

export interface ISeason {
  id: number;
  startDate: string;
  endDate: string;
  currentMatchday: number;
  winner: IWinner;
}

export interface ITeam {
  id: number;
  area: IArea;
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
  lastUpdated: string;
}

export interface ICompetitionTeamsResponse {
  count: number;
  filters: any;
  competition: ICompetition;
  season: ISeason;
  teams: ITeam[];
}

export interface ICompetitionTeamsState extends EntityState<ITeam> {
  competition: ICompetition;
  season: ISeason;
}

