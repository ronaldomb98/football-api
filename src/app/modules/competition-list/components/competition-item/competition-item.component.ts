import {Component, Input} from '@angular/core';
import {ICompetitionListItem} from '@modules/competition-list/models';

@Component({
  selector: 'app-competition-item',
  templateUrl: './competition-item.component.html',
  styleUrls: ['./competition-item.component.scss'],
})
export class CompetitionItemComponent {
  @Input() competition: ICompetitionListItem;
}
