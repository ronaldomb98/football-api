import {Provider} from '@angular/core';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {HttpClient} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed, waitForAsync} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {teamsMockResponse} from '@modules/competition-teams/__tests__/mocks';
import {environment} from '@environment/environment';
import {TeamService} from '@modules/team/services/team.service';
import {cleanTeam, loadTeam} from '@modules/team/store/actions';
import {teamMockResponse} from "@modules/team/__tests__/mocks";

export const teamServiceServiceMock: jasmine.SpyObj<TeamService>  = jasmine.createSpyObj([
  'getTeam',
  'loadTeam',
  'cleanTeam'
]);

export const teamServiceMockProvider: Provider = {
  provide: TeamService,
  useValue: teamServiceServiceMock
};

describe('TeamService', () => {
  let service: TeamService;
  let dispatch: jasmine.Spy;
  let store: MockStore;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  const id = '1';

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore(),
        TeamService
      ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ]
    }).compileComponents();

    service = TestBed.inject(TeamService);
    store = TestBed.inject(MockStore);
    dispatch = spyOn(store, 'dispatch');
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load team', () => {
    service.loadTeam(id);

    expect(dispatch).toHaveBeenCalledWith(loadTeam({ id }));
  });

  it('should clean team', () => {
    service.cleanTeam();

    expect(dispatch).toHaveBeenCalledWith(cleanTeam());
  });

  it('should fetch competition teams', (done) => {
    const data = teamMockResponse;
    service.getTeam(id).subscribe((response) => {
      expect(response.id).toEqual(data.id);
      done();
    });

    const req = httpTestingController.expectOne(`${environment.footballApi}/teams/${id}`);
    req.flush(data);

    httpTestingController.verify();
  });
});
