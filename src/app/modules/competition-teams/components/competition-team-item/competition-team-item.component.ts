import {Component, Input} from '@angular/core';
import {ITeam} from '@modules/competition-teams/models';

@Component({
  selector: 'app-competition-team-item',
  templateUrl: './competition-team-item.component.html',
  styleUrls: ['./competition-team-item.component.scss'],
})
export class CompetitionTeamItemComponent {
  @Input() team: ITeam;

}
