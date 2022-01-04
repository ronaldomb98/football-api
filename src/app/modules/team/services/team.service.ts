import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ITeam} from '@modules/team/models';
import {HttpClient} from '@angular/common/http';
import {Store} from '@ngrx/store';
import {environment} from '@environment/environment';
import {cleanTeam, loadTeam} from '@modules/team/store/actions';
import {selectTeam} from '@modules/team/store/selectors';

@Injectable()
export class TeamService {
  team$: Observable<ITeam> = this.store.select(selectTeam);

  constructor(private httpClient: HttpClient, private store: Store) { }

  getTeam(id: string): Observable<ITeam> {
    return this.httpClient.get<ITeam>(`${environment.footballApi}/teams/${id}`);
  }

  loadTeam(id: string) {
    this.store.dispatch(loadTeam({ id }));
  }

  cleanTeam() {
    this.store.dispatch(cleanTeam());
  }
}
