import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {CompetitionListComponent} from '../../components/competition-list/competition-list.component';
import {CompetitionItemComponent} from '@modules/competition-list/components/competition-item/competition-item.component';
import {CommonModule} from '@angular/common';
import {SharedModule} from '@shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicInputMaskModule} from '@thiagoprz/ionic-input-mask';
import {provideMockStore} from '@ngrx/store/testing';
import {competitionListServiceMockProvider} from '@modules/competition-list/__test__/services/competition-list.service.spec';
import {CompetitionListService} from '@modules/competition-list/services/competition-list.service';
import {Subject} from 'rxjs';
import {ICompetitionListItem} from '@modules/competition-list/models';
import {competitionsListMock} from '@modules/competition-list/__test__/mocks';
import {By} from '@angular/platform-browser';
import {RouterTestingModule} from '@angular/router/testing';

describe('CompetitionListComponent', () => {
  let component: CompetitionListComponent;
  let fixture: ComponentFixture<CompetitionListComponent>;
  let service: jasmine.SpyObj<CompetitionListService>;
  let competitionsSubj: Subject<ICompetitionListItem[]>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CompetitionListComponent, CompetitionItemComponent ],
      providers: [
        provideMockStore(),
        { ...competitionListServiceMockProvider }
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
    competitionsSubj = new Subject<ICompetitionListItem[]>();
    service = TestBed.inject(CompetitionListService) as jasmine.SpyObj<CompetitionListService>;
    service.competitions$ = competitionsSubj;
    fixture = TestBed.createComponent(CompetitionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(service.loadCompetitions).toHaveBeenCalled();
  });

  it('should display list on api response ', () => {
    competitionsSubj.next( [...competitionsListMock]);

    fixture.detectChanges();

    const list = fixture.debugElement.query(By.css('ion-list'));
    const elements = list.queryAll(By.css('ion-item'));

    expect(elements.length).toEqual(competitionsListMock.length);
  });

  it('should display filtered competitions list', () => {
    competitionsSubj.next( [...competitionsListMock]);
    component.filters.controls.season.setValue('2001-01-08');

    fixture.detectChanges();

    const list = fixture.debugElement.query(By.css('ion-list'));
    const elements = list.queryAll(By.css('ion-item'));

    expect(elements.length).toEqual(1);
  });
});
