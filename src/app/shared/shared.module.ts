import {NgModule} from '@angular/core';
import {ErrorsToastService} from '@shared/services/errors-toast.service';
import {BackToHomeComponent} from '@shared/components/back-to-home/back-to-home.component';
import {IonicModule} from '@ionic/angular';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [BackToHomeComponent],
  imports: [CommonModule, IonicModule],
  providers: [ErrorsToastService],
  exports: [BackToHomeComponent]
})
export class SharedModule {}
