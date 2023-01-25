import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TimeScoreComponent } from './time-score/time-score.component';
import { GamePlanComponent } from './game-plan/game-plan.component';
import {StateService } from './state.service';
import { MoleComponent } from './mole/mole.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    TimeScoreComponent,
    GamePlanComponent,
    MoleComponent
  ],
  imports: [
    BrowserModule,
    NgbModule
  ],
  providers: [StateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
