import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ICompetition, ICompetitionTeamsResponse, ISeason, ITeam} from '@modules/competition-teams/models';
import {environment} from '@environment/environment';
import {Store} from '@ngrx/store';
import {selectAllCompetitionTeams, selectCompetition, selectSeason} from '@modules/competition-teams/store/selectors';
import {cleanCompetitionTeams, loadCompetitionTeams} from '@modules/competition-teams/store/actions';

@Injectable()
export class CompetitionTeamsService {
  competition$: Observable<ICompetition> = this.store.select(selectCompetition);
  season$: Observable<ISeason> = this.store.select(selectSeason);
  teams$: Observable<ITeam[]> = this.store.select(selectAllCompetitionTeams);

  constructor(private httpClient: HttpClient, private store: Store) { }

  getTeams(id: string): Observable<ICompetitionTeamsResponse> {
    return this.httpClient.get<ICompetitionTeamsResponse>(`${environment.footballApi}/competitions/${id}/teams`);
  }

  loadCompetitionTeams(id: string) {
    this.store.dispatch(loadCompetitionTeams({ id }));
  }

  cleanCompetitionTeams() {
    this.store.dispatch(cleanCompetitionTeams());
  }

}
