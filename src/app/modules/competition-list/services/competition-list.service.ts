import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '@environment/environment';
import {Observable} from 'rxjs';
import {ICompetitionListItem, ICompetitionListResponse} from '../models';
import {Store} from '@ngrx/store';
import {loadCompetitionList} from '@modules/competition-list/store/actions';
import {selectAllCompetitions} from '@modules/competition-list/store/selectors';

@Injectable()
export class CompetitionListService {
  competitions$: Observable<ICompetitionListItem[]> = this.store.select(selectAllCompetitions);

  constructor(private httpClient: HttpClient, private store: Store) { }

  loadCompetitions() {
    this.store.dispatch(loadCompetitionList());
  }

  competitions(): Observable<ICompetitionListResponse> {
    return this.httpClient.get<ICompetitionListResponse>(`${environment.footballApi}/competitions`);
  }
}
