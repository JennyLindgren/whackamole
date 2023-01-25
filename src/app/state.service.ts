 import { Injectable } from '@angular/core';
 import { Gamestate } from './State';
  import { BehaviorSubject } from 'rxjs';

 @Injectable({
   providedIn: 'root'
 })
 export class StateService {

  private stateSubject = new BehaviorSubject<Gamestate>({ timer: 0, isVisible: false, score: 0 });
  private state: Gamestate = { timer: 60, isVisible: false, score: 1 };  // State
  private interval: any = null;
  private gameInterval: any = null;
  public moles: Gamestate[] = [];
  public timers: NodeJS.Timer[] = [];

  constructor() { }
  
  // Skapar mullvader
  createMoles(): Gamestate[] {
    // Bara så jag vet att den körs via konsollen under utveckling
    console.log('creating moles');
    // Här ska mullvaderna in
    let moles: Gamestate[] = [];
    // Det här är en timer array 
    this.timers=[];
    // Behöver ju 25 mullvader så en loop för att skapa och pusha in dem
    for (let i = 0; i < 25; i++) {
      moles.push({ timer: 0, isVisible: false, moleId: i}) 
      this.timers.push();
    }
    console.log(this.timers)
    return moles;
  }

  // Metod för att hämta states i andra komponenter
  getState() {
    return this.stateSubject.asObservable();
  }

  // Metod för att berätta att läget har förändrats
  private stateChanged() {
    this.stateSubject.next({ ...this.state }); // Kopia av state
  }

  // Metod för att visa mullvader
  showMole() {
    // Bool för att ha koll på när vi är klara med att visa mullvader 
    let isRendering = true;
    // loop som avslutas när vi lyckats visa en mullvad
    while(isRendering == true) {
      // Rolig uträkning för ett random nummer mellan 0 och 24 när jag googla
      let random = Math.floor(Math.random() * ((24-2)+1) + 0);
      // Kollar så att inte mullvaden som ska visas inte redan syns
      if(this.moles[random].isVisible == true) {
        random = Math.floor(Math.random() * ((24-2)+1) + 0);
        console.log('not here');
      } else {
        // Sätter isVisible till true så mullvaden syns
        this.moles[random].isVisible = true;
        // Timeout så mulladen försvinner efter 4 sekunder
        let timeout = setTimeout(() => {
          this.moles[random].isVisible = false;
        }, 4000)
        this.timers[random] = timeout;
        isRendering = false;
        console.log(random)
        console.log(timeout)
      }
    }    
  }// Gör att knappen inte går att trycka på under spelets gång
  IsDisable(stop:boolean){
    this.state.isDisabled = stop;
    this.stateChanged();
  }

  game() {
    console.log('Starting game');
    // Nolla poängen
    this.state.score = 0;
    // Visa första mullvaden
    this.showMole();
    // vänta en sekund innan nästa mullvad
    setTimeout(() => this.showMole(), 1000);
    // Intervall på 4 sekunder som lägger till nya mullvader
    this.gameInterval = setInterval(() => {
      // Kollar så inte timern tagit slut
      if(this.state.timer <= 0){
        console.log('time stopped')
        // Ta bort mullvader
        this.destroyMoles();
        // Borde sätta startknappen till disable false
        this.IsDisable(false);
        // Töm game intervallen
        clearInterval(this.gameInterval);
        this.gameInterval = null;
      } else {
        // Tiden är inte ute så vi skapar några mullvader till
        this.showMole();
        setTimeout(() => this.showMole(), 1000);
        setTimeout(() => this.showMole(), 2000);
      }
    }, 4000)
  }
  //Så att mole försvinner när vi klickat på den
  destroyMoles() {
    this.moles.map((mole) => {
      console.log('removing mole')
      mole.isVisible = false;
    });
  }

  timerStart() {
    this.state.timer = 60;
    this.moles = this.createMoles();
    // Starta inte timern om antalet är 0 eller mindre eller om det finns en timer igång
    if (this.state.timer <= 0 || this.interval != null) return;
    this.interval = setInterval(() => {       // Startar intervallen
      this.state.timer--;                     // Minskar tiden med 1
      this.stateChanged();
      if(this.state.timer <= 0) {             // Tid att sluta?
        console.log('stopped timer');
        clearInterval(this.interval);         // Stoppar intervallen
        this.interval = null;               // Rensar intervallen
      
         // stateChanged för att medela att vi har förändrat state
        this.stateChanged();
        
       
      }
    }, 1000);
  }

  timerReset() {
    // Stoppar intervallen om den är på
    if (this.interval != null) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  // En metod för att reagera på allt som händer när man klickar på en mullvad
  clickedMole(moleId: number) {
    // Denna ska nollställa en timer i en array(moleId) men verkar inte fungera
    clearTimeout(this.timers[moleId]);
    // Kollar läget med state.score. Om den har ett värde så lägger den till 1, annars sätter den grund värdet till utifall den är undefined 
    this.state.score = this.state.score ? this.state.score + 1 : 1;
    // Här sätter den isVisible på den aktuella mullvaden till false så den försvinner från spelplan
    this.moles[moleId].isVisible = false;
    // stateChanged för att medela att vi har förändrat state
    this.stateChanged();
  }

}
