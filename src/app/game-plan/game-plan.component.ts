import { Component } from '@angular/core';
import { Gamestate } from '../State';
import { StateService } from '../state.service';

@Component({
  selector: 'app-game-plan',
  templateUrl: './game-plan.component.html',
  styleUrls: ['./game-plan.component.css']
})
export class GamePlanComponent {
  state!: Gamestate;
  moles!: any;

  constructor(private _state: StateService) { 
    this._state.getState().subscribe((newState) => {
      this.state = newState;
      this.moles = this._state.moles;
    });
    
  }

  onClick(moleId: any) {
    this._state.clickedMole(moleId);
  }
  
  // activeMole: {x: number, y: number, score: number} | null = null;
  
  // activeMole!: ActiveMole;
  
  // constructor(private _mole: FunctionService) {
  //   this._mole.whackMole().subscribe((mole) => {
  //      this.activeMole = mole;
  //   });
  // }
  // whackMole(){
  //   this._mole.whackMole();
  // }
}

