 import { Injectable } from '@angular/core';
 import { Gamestate } from './State';
  import { BehaviorSubject } from 'rxjs';

 @Injectable({
   providedIn: 'root'
 })
 export class StateService {

  private stateSubject = new BehaviorSubject<Gamestate>({ timer: 0, isVisible: false, score: 0 });
  private state: Gamestate = { timer: 30, isVisible: false, score: 1 };  // State
  private interval: any = null;
  private gameInterval: any = null;
  public moles: Gamestate[] = [];

  constructor() { }
  
  createMoles(): Gamestate[] {
    console.log('creating moles');
    let moles: Gamestate[] = [];
    for (let i = 0; i < 25; i++) {
      moles.push({ timer: 4, isVisible: false, moleId: i}) 
    }
    return moles;
  }

  getState() {
    return this.stateSubject.asObservable();
  }

  private stateChanged() {
    this.stateSubject.next({ ...this.state }); // Send a copy of the state
  }

  showMole() { 
    let isRendered = true;
    while(isRendered == true) {
      let random = Math.floor(Math.random() * ((24-2)+1) + 0);
      if(this.moles[random].isVisible == true) {
        random = Math.floor(Math.random() * ((24-2)+1) + 0);
      } else {
        this.moles[random].isVisible = true;
        setInterval(() => {
          this.moles[random].isVisible = false;
        }, 4000)
        isRendered = false;
      }
    }    
  }

  game() {
    console.log('Starting game');
    this.state.score = 0;
    this.showMole();
    this.showMole();
    this.gameInterval = setInterval(() => {
      if(this.state.timer <= 0){
        console.log('time stopped')
        clearInterval(this.gameInterval);
        this.gameInterval = null;
      } else {
        this.showMole();
        this.showMole();
      }
    }, 4000)
  }

  timerStart() {
    this.state.timer = 30;
    this.moles = this.createMoles();
    console.log(this.moles)
    // Do not start the timer if count is 0 or less or if there is a timer running
    if (this.state.timer <= 0 || this.interval != null) return;
    this.interval = setInterval(() => {       // Start the interval
      this.state.timer--;                     // Reduce timer by 1
      this.stateChanged();
      if(this.state.timer <= 0) {             // Time to stop?
        console.log('stopped timer');
        clearInterval(this.interval);         // Stop the interval
        this.interval = null;               // Clear interval
      }
    }, 1000);
  }

  timerReset() {
    if (this.interval != null) {              // If the interval is on - stop it
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  clickedMole(moleId: number) {
    this.state.score = this.state.score ? this.state.score + 1 : 1;
    this.moles[moleId].isVisible = false;
    this.stateChanged();
    console.log(this.state.score)
  }

//  private seconds = 20;
//   private stateMole = new BehaviorSubject<ActiveMole>({isVisible:false})
//   private stateSubject = new BehaviorSubject<time>({ timer: this.seconds });
//   private time: time = { timer: this.seconds };  // Time
//   private interval: any = null;
//   private interval2: any = null;
//   private activeMole: ActiveMole ={isVisible:false,}
//   private score = 0;
//   state:Score ={score:0};
//   private stateScore = new BehaviorSubject<Score>({score:this.score})

  //constructor() { }

//   getTime() {
//     return this.stateSubject.asObservable();
//   }
//   getScore(){
//     return this.stateScore.asObservable();
//   }

//   private timeChanged() {
//     this.stateSubject.next({ ...this.time }); // Send a copy of the state
//   }
//   private moleMoved() {
//     this.stateMole.next({ ...this.activeMole });
//   }
//   private scoreChange(){
    
//   }

//   timerStart() {
//     console.log('start timer', this.time.timer)
//     // Do not start the timer if count is 0 or less or if there is a timer running
//     if (this.time.timer <= 0 || this.interval != null) {
//       this.time = {timer: this.seconds}; 
//       this.timeChanged();
//     }

//     this.interval = setInterval(() => {       // Start the interval
//       this.time.timer--;                     // Reduce timer by 1
//       this.timeChanged();
//       if(this.time.timer <= 0) {             // Time to stop?
//         clearInterval(this.interval);         // Stop the interval
//         this.interval = null;                 // Clear interval
//       }
//     }, 1000);
//   }

//   showMole() {
//     const x = Math.floor(Math.random() * 5);
//     const y = Math.floor(Math.random() * 5);
//     this.activeMole = { isVisible:true};
//     this.moleMoved();
//     console.log(x, y)
//     return this.stateMole.asObservable();
//   }
  
//   whackMole() {
//     console.log('clicked');  
//     this.activeMole = { isVisible:false, };
//     this.moleMoved();
//     this.score ++;
//     console.log('score: ', this.score)
//     return this.stateMole.asObservable();

//   }

//   newGame(){
//     console.log('starting game')
//     this.score = 0;
//     this.showMole();
//     this.interval2 = setInterval(() => {
//       if(this.time.timer<=0){
//         console.log('time stopped')
//         console.log('final score: ', this.score)
        
//         clearInterval(this.interval2);
//         this.interval2 = null;
//       } else {
//         this.showMole();
       
//       }
//     }, 4000);
    
    
    
//   }  
// }



  
//   timerReset() {
//     if (this.interval != null) {              // If the interval is on - stop it
//       clearInterval(this.interval);
//       this.interval = null;
//     }
//     this.time.timer = 60;                    // Reset the timer
//     this.timeChanged();
}
