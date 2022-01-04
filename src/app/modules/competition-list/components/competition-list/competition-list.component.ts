import {Component, OnInit} from '@angular/core';
import {combineLatest, Observable} from 'rxjs';
import {ICompetitionListItem} from '@modules/competition-list/models';
import {map, startWith} from 'rxjs/operators';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CompetitionListService} from '@modules/competition-list/services/competition-list.service';
import {filterCompetitions} from '@modules/competition-list/utils';


@Component({
  selector: 'app-competition-list',
  templateUrl: './competition-list.component.html',
  styleUrls: ['./competition-list.component.scss']
})
export class CompetitionListComponent implements OnInit {
  competitions$: Observable<ICompetitionListItem[]>;
  filters: FormGroup;

  constructor(
    private competitionListService: CompetitionListService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.competitionListService.loadCompetitions();
    this.buildForm();
    this.buildFilter();
  }

  buildForm() {
    this.filters = this.formBuilder.group({
      season: ['']
    });
  }

  buildFilter() {
    const season$ = this.filters.controls.season.valueChanges.pipe(startWith(''));
    const competitions$ = this.competitionListService.competitions$;

    this.competitions$ = combineLatest([season$, competitions$]).pipe(
      map(([season, competitions]) =>
        (competitions.length && season.length) ? filterCompetitions(season, competitions) : competitions),
    );

  }
}
