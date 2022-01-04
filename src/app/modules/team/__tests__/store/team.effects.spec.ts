import {Observable, of, throwError} from 'rxjs';
import {Action} from '@ngrx/store';
import {TestBed, waitForAsync} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {ToastController} from '@ionic/angular';
import {ErrorsToastService} from '@shared/services/errors-toast.service';
import {HttpErrorResponse} from '@angular/common/http';
import {HttpErrorsEnum} from '@shared/utils';
import {TeamEffects} from '@modules/team/store/effects/team.effects';
import {TeamService} from '@modules/team/services/team.service';
import {teamServiceMockProvider} from '@modules/team/__tests__/services/team.service.spec';
import {teamMockResponse} from '@modules/team/__tests__/mocks';
import {loadTeam, teamFailed, teamLoaded} from '@modules/team/store/actions';

describe('TeamEffects', () => {
  let service: TeamEffects;
  let teamService: jasmine.SpyObj<TeamService>;
  const id = '1';
  let toastController: jasmine.SpyObj<ToastController>;
  let actions$: Observable<Action>;

  const validateError = (error: HttpErrorResponse, done) => {
    actions$ = of(loadTeam({id}));
    teamService.getTeam.and.returnValue(throwError(error));
    const mockToast: any = {present: jasmine.createSpy()};
    mockToast.present.and.returnValue(of({}));
    toastController.create.and.returnValue(of(mockToast).toPromise());

    service.loadTeam$.subscribe((result) => {
      expect(result).toEqual(teamFailed({error}));
      done();
    });
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockActions(() => actions$),
        TeamEffects,
        ErrorsToastService,
        { ...teamServiceMockProvider },
        {
          provide: ToastController,
          useValue: jasmine.createSpyObj(['create'])
        }
      ],
      imports: [RouterTestingModule]
    }).compileComponents();

    service = TestBed.inject(TeamEffects);
    toastController = TestBed.inject(ToastController) as jasmine.SpyObj<ToastController>;
    teamService = TestBed.inject(TeamService) as jasmine.SpyObj<TeamService>;
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should execute team fetching', (done) => {
    const team = teamMockResponse;
    actions$ = of(loadTeam({ id }));
    teamService.getTeam.and.returnValue(of({ ...team }));
    const mockToast: any = { present: jasmine.createSpy() };
    mockToast.present.and.returnValue(of({}));
    toastController.create.and.returnValue(of(mockToast).toPromise());

    service.loadTeam$.subscribe((result) => {
      expect(result).toEqual(teamLoaded({team}));
      done();
    });
  });

  it('should notify team not found error', (done) => {
    const error = new HttpErrorResponse({status: HttpErrorsEnum.notFound});
    validateError(error, done);
  });

  it('should notify team unauthorized error', (done) => {
    const error = new HttpErrorResponse({status: HttpErrorsEnum.unauthorized });
    validateError(error, done);
  });

  it('should notify team unexpected error', (done) => {
    const error = new HttpErrorResponse({status: 500 });
    validateError(error, done);
  });
});
