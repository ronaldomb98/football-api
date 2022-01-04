import {TestBed, waitForAsync} from '@angular/core/testing';
import {CompetitionListEffects} from '@modules/competition-list/store/effects/competition-list.effects';
import {competitionListServiceMockProvider} from '@modules/competition-list/__test__/services/competition-list.service.spec';
import {provideMockActions} from '@ngrx/effects/testing';
import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import {competitionListLoaded, loadCompetitionList} from '@modules/competition-list/store/actions';
import {CompetitionListService} from '@modules/competition-list/services/competition-list.service';
import {competitionMockResponse} from '@modules/competition-list/__test__/mocks';


describe('CompetitionListEffects', () => {
  let service: CompetitionListEffects;
  let competitionListService: jasmine.SpyObj<CompetitionListService>;
  let actions$: Observable<Action>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockActions(() => actions$),
        CompetitionListEffects,
        { ...competitionListServiceMockProvider }
      ],
    }).compileComponents();

    service = TestBed.inject(CompetitionListEffects);
    competitionListService = TestBed.inject(CompetitionListService) as jasmine.SpyObj<CompetitionListService>;
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should execute competition fetching', (done) => {
    actions$ = of(loadCompetitionList());
    competitionListService.competitions.and.returnValue(of({ ...competitionMockResponse }));

    service.loadEffects$.subscribe((result) => {
      expect(result).toEqual(competitionListLoaded({ competitionList:competitionMockResponse.competitions }));
      done();
    });
  });
});
