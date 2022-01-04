import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {CompetitionTeamsComponent} from '../../components/competition-teams/competition-teams.component';
import {provideMockStore} from '@ngrx/store/testing';
import {CommonModule} from '@angular/common';
import {SharedModule} from '@shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicInputMaskModule} from '@thiagoprz/ionic-input-mask';
import {RouterTestingModule} from '@angular/router/testing';
import {of, Subject} from 'rxjs';
import {CompetitionTeamsService} from '@modules/competition-teams/services/competition-teams.service';
import {ITeam} from '@modules/competition-teams/models';
import {CompetitionTeamItemComponent} from '@modules/competition-teams/components/competition-team-item/competition-team-item.component';
import {competitionTeamsServiceMockProvider} from '@modules/competition-teams/__tests__/services/competition-teams.service.spec';
import {teamsMockResponse} from '@modules/competition-teams/__tests__/mocks';
import {By} from '@angular/platform-browser';


describe('CompetitionTeamsComponent', () => {
  let component: CompetitionTeamsComponent;
  let fixture: ComponentFixture<CompetitionTeamsComponent>;
  let service: jasmine.SpyObj<CompetitionTeamsService>;
  let teamSubj: Subject<ITeam[]>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CompetitionTeamsComponent, CompetitionTeamItemComponent ],
      providers: [
        provideMockStore(),
        { ...competitionTeamsServiceMockProvider }
      ],
      imports: [
        CommonModule,
        IonicModule,
        SharedModule,
        FormsModule,
        IonicInputMaskModule,
        ReactiveFormsModule,
        RouterTestingModule
      ]
    }).compileComponents();
    teamSubj = new Subject<ITeam[]>();
    service = TestBed.inject(CompetitionTeamsService) as jasmine.SpyObj<CompetitionTeamsService>;
    service.teams$ = teamSubj;
    service.competition$ = of({...teamsMockResponse.competition});
    service.season$ = of({...teamsMockResponse.season});
    fixture = TestBed.createComponent(CompetitionTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(service.loadCompetitionTeams).toHaveBeenCalled();
  });

  it('should display competition team list', () => {
    teamSubj.next([...teamsMockResponse.teams]);

    fixture.detectChanges();

    const list = fixture.debugElement.query(By.css('ion-list'));
    const elements = list.queryAll(By.css('ion-item'));

    expect(elements.length).toEqual(teamsMockResponse.teams.length);
  });

  it('should clean store on destroy', () => {
    teamSubj.next([...teamsMockResponse.teams]);

    fixture.detectChanges();

    fixture.destroy();

    expect(service.cleanCompetitionTeams).toHaveBeenCalled();
  });
});
