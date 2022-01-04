import {CompetitionTeamsService} from '@modules/competition-teams/services/competition-teams.service';
import {Provider} from '@angular/core';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {HttpClient} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed, waitForAsync} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {cleanCompetitionTeams, loadCompetitionTeams} from '@modules/competition-teams/store/actions';
import {teamsMockResponse} from '@modules/competition-teams/__tests__/mocks';
import {environment} from '@environment/environment';

export const competitionTeamsServiceMock: jasmine.SpyObj<CompetitionTeamsService>  = jasmine.createSpyObj([
  'getTeams',
  'loadCompetitionTeams',
  'cleanCompetitionTeams'
]);

export const competitionTeamsServiceMockProvider: Provider = {
  provide: CompetitionTeamsService,
  useValue: competitionTeamsServiceMock
};

describe('CompetitionTeamsService', () => {
  let service: CompetitionTeamsService;
  let dispatch: jasmine.Spy;
  let store: MockStore;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  const id = '1';

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore(),
        CompetitionTeamsService
      ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ]
    }).compileComponents();

    service = TestBed.inject(CompetitionTeamsService);
    store = TestBed.inject(MockStore);
    dispatch = spyOn(store, 'dispatch');
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load competition teams', () => {
    service.loadCompetitionTeams(id);

    expect(dispatch).toHaveBeenCalledWith(loadCompetitionTeams({ id }));
  });

  it('should clean competition teams', () => {
    service.cleanCompetitionTeams();

    expect(dispatch).toHaveBeenCalledWith(cleanCompetitionTeams());
  });

  it('should fetch competition teams', (done) => {
    const data = teamsMockResponse;
    service.getTeams(id).subscribe((response) => {
      expect(response).toEqual(data);
      done();
    });

    const req = httpTestingController.expectOne(`${environment.footballApi}/competitions/${id}/teams`);
    req.flush(data);

    httpTestingController.verify();
  });
});
