import { Component } from '@angular/core';
import { Gamestate } from '../State';
import { StateService } from '../state.service';

@Component({
  selector: 'app-time-score',
  templateUrl: './time-score.component.html',
  styleUrls: ['./time-score.component.css']
})

export class TimeScoreComponent {
  isDisabled: any; //any gör att värdet bestäms vid tilldelning
  state!: Gamestate;       // Det här attributet innehåller state - det används för att bestämma hur komponenten ska renderas
  
  // Premurerar på state för timer (och knappen men den funkar inte)
  constructor(private _state: StateService) {
      this._state.getState().subscribe((newState) => {
      this.state = newState;
      
      this.isDisabled = newState.isDisabled;
      //Skriver ut i consolen att den är falsk men uppdaterar inte läget
      console.log(this.isDisabled) 
    });
  }

  // Metod kopplad till start knappen för att köra igång
  onStartClick() {
    this._state.timerStart();
    this._state.game();
    this._state.IsDisable(true)
  }

}

