import {TestBed, waitForAsync} from '@angular/core/testing';

import {CompetitionListService} from '../../services/competition-list.service';
import {Provider} from '@angular/core';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {HttpClient} from "@angular/common/http";
import {loadCompetitionList} from "@modules/competition-list/store/actions";
import {competitionMockResponse} from "@modules/competition-list/__test__/mocks";
import {environment} from "@environment/environment";

export const competitionListServiceMock: jasmine.SpyObj<CompetitionListService> = jasmine.createSpyObj([
  'loadCompetitions', 'competitions'
]);

export const competitionListServiceMockProvider: Provider = {
  provide: CompetitionListService,
  useValue: competitionListServiceMock
};

describe('CompetitionListService', () => {
  let service: CompetitionListService;
  let dispatch: jasmine.Spy;
  let store: MockStore;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore(),
        CompetitionListService
      ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ]
    }).compileComponents();

    service = TestBed.inject(CompetitionListService);
    store = TestBed.inject(MockStore);
    dispatch = spyOn(store, 'dispatch');
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should trigger load competitions action', () => {
    service.loadCompetitions();

    expect(dispatch).toHaveBeenCalledWith(loadCompetitionList());
  });

  it('should fetch competitions response', (done) => {
    const data = competitionMockResponse;
    service.competitions().subscribe((response) => {
      expect(response).toEqual(data);
      done();
    });

    const req = httpTestingController.expectOne(`${environment.footballApi}/competitions`);
    req.flush(data);

    httpTestingController.verify();
  });
});
