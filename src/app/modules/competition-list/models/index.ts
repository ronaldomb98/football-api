import {EntityState} from '@ngrx/entity';

export interface IArea {
  id: number;
  name: string;
  countryCode: string;
  ensignUrl: string;
}

export interface IWinner {
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crestUrl: string;
}

export interface ICurrentSeason {
  id: number;
  startDate: string;
  endDate: string;
  currentMatchday?: number;
  winner: IWinner;
}

export interface ICompetitionListItem {
  id: number;
  area?: IArea;
  name: string;
  code: string;
  emblemUrl: string;
  plan: string;
  currentSeason?: ICurrentSeason;
  numberOfAvailableSeasons: number;
  lastUpdated: string;
}

export interface ICompetitionListResponse {
  count: number;
  filters: object;
  competitions: ICompetitionListItem[];
}

export type ICompetitionListState = EntityState<ICompetitionListItem>;
