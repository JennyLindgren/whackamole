import { Component } from '@angular/core';
import { Gamestate } from '../State';
import { StateService } from '../state.service';

@Component({
  selector: 'app-time-score',
  templateUrl: './time-score.component.html',
  styleUrls: ['./time-score.component.css']
})

export class TimeScoreComponent {
  state!: Gamestate;                // This attribute contains the state - it is used to determine how the component should render
  
  constructor(private _state: StateService) {
      this._state.getState().subscribe((newState) => {
        this.state = newState;
      });
   }

  onStartClick() {
    this._state.timerStart();
    this._state.game();
  }


// time!:time;                // This attribute contains the state - it is used to determine how the component should render
// score!: any;
  
//  constructor(private _time: FunctionService, private _newGame: FunctionService, private _score: FunctionService) {
//     this._time.getTime().subscribe((newTime) => {
//        this.time = newTime;
//     }); 
//     this._score.getScore().subscribe((newScore) => {
//       this.score = newScore;
//     }) 
    
//   }

// onStartClick() {
//   this._time.timerStart();
//   this._newGame.newGame();
// }

}

