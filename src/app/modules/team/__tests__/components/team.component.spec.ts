import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';
import {provideMockStore} from '@ngrx/store/testing';
import {CommonModule} from '@angular/common';
import {SharedModule} from '@shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicInputMaskModule} from '@thiagoprz/ionic-input-mask';
import {RouterTestingModule} from '@angular/router/testing';
import {Subject} from 'rxjs';

import {By} from '@angular/platform-browser';
import {TeamComponent} from '@modules/team/components/team/team.component';
import {TeamService} from '@modules/team/services/team.service';
import {ITeam} from '@modules/team/models';
import {teamMockResponse} from '@modules/team/__tests__/mocks';
import {teamServiceMockProvider} from '@modules/team/__tests__/services/team.service.spec';


describe('TeamComponent', () => {
  let component: TeamComponent;
  let fixture: ComponentFixture<TeamComponent>;
  let service: jasmine.SpyObj<TeamService>;
  let teamSubj: Subject<ITeam>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamComponent ],
      providers: [
        provideMockStore(),
        { ...teamServiceMockProvider }
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
    teamSubj = new Subject<ITeam>();
    service = TestBed.inject(TeamService) as jasmine.SpyObj<TeamService>;
    service.team$ = teamSubj;
    fixture = TestBed.createComponent(TeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(service.loadTeam).toHaveBeenCalled();
  });

  it('should display competition team list', () => {
    teamSubj.next({...teamMockResponse});

    fixture.detectChanges();

    const list = fixture.debugElement.query(By.css('ion-list'));
    const elements = list.queryAll(By.css('ion-item'));

    expect(elements.length).toEqual(teamMockResponse.squad.length);
  });

  it('should clean store on destroy', () => {
    teamSubj.next({...teamMockResponse});

    fixture.detectChanges();

    fixture.destroy();

    expect(service.cleanTeam).toHaveBeenCalled();
  });
});
