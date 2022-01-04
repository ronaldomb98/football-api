import {Component, OnDestroy, OnInit} from '@angular/core';
import {TeamService} from '@modules/team/services/team.service';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {ITeam} from '@modules/team/models';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
})
export class TeamComponent implements OnInit, OnDestroy {
  team$: Observable<ITeam> = this.teamService.team$;

  constructor(private teamService: TeamService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.teamService.loadTeam(id);
  }

  ngOnDestroy() {
    this.teamService.cleanTeam();
  }

}
