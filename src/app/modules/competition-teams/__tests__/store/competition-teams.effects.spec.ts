import {CompetitionTeamsEffects} from '@modules/competition-teams/store/effects/competition-teams.effects';
import {Observable, of, throwError} from 'rxjs';
import {Action} from '@ngrx/store';
import {TestBed, waitForAsync} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {CompetitionTeamsService} from '@modules/competition-teams/services/competition-teams.service';
import {competitionTeamsServiceMockProvider} from '@modules/competition-teams/__tests__/services/competition-teams.service.spec';
import {RouterTestingModule} from '@angular/router/testing';
import {ToastController} from '@ionic/angular';
import {
  competitionTeamsFailed,
  competitionTeamsLoaded,
  loadCompetitionTeams
} from '@modules/competition-teams/store/actions';
import {teamsMockResponse} from '@modules/competition-teams/__tests__/mocks';
import {ErrorsToastService} from '@shared/services/errors-toast.service';
import {HttpErrorResponse} from '@angular/common/http';
import {HttpErrorsEnum} from '@shared/utils';

describe('CompetitionTeamsEffects', () => {
  let service: CompetitionTeamsEffects;
  let competitionTeamsService: jasmine.SpyObj<CompetitionTeamsService>;
  let actions$: Observable<Action>;
  let toastController: jasmine.SpyObj<ToastController>;
  const id = '1';

  const validateToast = (error: HttpErrorResponse, done) => {
    actions$ = of(loadCompetitionTeams({id}));
    competitionTeamsService.getTeams.and.returnValue(throwError(error));
    const mockToast: any = {present: jasmine.createSpy()};
    mockToast.present.and.returnValue(of({}));
    toastController.create.and.returnValue(of(mockToast).toPromise());

    service.loadCompetitionTeams$.subscribe((result) => {
      expect(result).toEqual(competitionTeamsFailed({error}));
      done();
    });
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockActions(() => actions$),
        CompetitionTeamsEffects,
        ErrorsToastService,
        { ...competitionTeamsServiceMockProvider },
        {
          provide: ToastController,
          useValue: jasmine.createSpyObj(['create'])
        }
      ],
      imports: [RouterTestingModule]
    }).compileComponents();

    service = TestBed.inject(CompetitionTeamsEffects);
    toastController = TestBed.inject(ToastController) as jasmine.SpyObj<ToastController>;
    competitionTeamsService = TestBed.inject(CompetitionTeamsService) as jasmine.SpyObj<CompetitionTeamsService>;
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should execute competition teams fetching', (done) => {
    actions$ = of(loadCompetitionTeams({ id }));
    competitionTeamsService.getTeams.and.returnValue(of({ ...teamsMockResponse }));
    const mockToast: any = { present: jasmine.createSpy() };
    mockToast.present.and.returnValue(of({}));
    toastController.create.and.returnValue(of(mockToast).toPromise());
    const {teams, competition, season} = teamsMockResponse;

    service.loadCompetitionTeams$.subscribe((result) => {
      expect(result).toEqual(competitionTeamsLoaded({teams, competition, season}));
      done();
    });
  });

  it('should notify not found error', (done) => {
    const error = new HttpErrorResponse({status: HttpErrorsEnum.notFound});
    validateToast(error, done);
  });

  it('should notify unauthorized error', (done) => {
    const error = new HttpErrorResponse({status: HttpErrorsEnum.unauthorized });
    validateToast(error, done);
  });

  it('should notify unauthorized error', (done) => {
    const error = new HttpErrorResponse({status: 500 });
    validateToast(error, done);
  });
});
