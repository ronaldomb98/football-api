import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CompetitionTeamsService} from '@modules/competition-teams/services/competition-teams.service';
import {Observable} from 'rxjs';
import {ICompetition, ISeason, ITeam} from '@modules/competition-teams/models';

@Component({
  selector: 'app-competition-teams',
  templateUrl: './competition-teams.component.html',
  styleUrls: ['./competition-teams.component.scss'],
})
export class CompetitionTeamsComponent implements OnInit, OnDestroy {
  teams$: Observable<ITeam[]> = this.competitionTeamsService.teams$;
  competition$: Observable<ICompetition> = this.competitionTeamsService.competition$;
  season$: Observable<ISeason> = this.competitionTeamsService.season$;

  constructor(private competitionTeamsService: CompetitionTeamsService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.competitionTeamsService.loadCompetitionTeams(id);
  }

  ngOnDestroy() {
    this.competitionTeamsService.cleanCompetitionTeams();
  }

}
