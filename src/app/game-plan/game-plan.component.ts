import { Component } from '@angular/core';
import { Gamestate } from '../State';
import { StateService } from '../state.service';

@Component({
  selector: 'app-game-plan',
  templateUrl: './game-plan.component.html',
  styleUrls: ['./game-plan.component.css']
})
export class GamePlanComponent {
  state!: Gamestate;   // Det här attributet innehåller state - det används för att bestämma hur komponenten ska renderas
  moles!: any;     //any gör att värdet bestäms vid tilldelning

// premererar på state för att ha koll på mullvadarna
  constructor(private _state: StateService) { 
    this._state.getState().subscribe((newState) => {
      this.state = newState;
      this.moles = this._state.moles;
    });
    
  }

  // metod för att man ska kunna klicka (skickar med moleid)
  onClick(moleId: any) {
    this._state.clickedMole(moleId);
  }
  
}

