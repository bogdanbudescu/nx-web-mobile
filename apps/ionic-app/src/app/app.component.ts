import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Board, GameService, Player } from '@nx-ionic/game';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public players = [{ value: 0, name: 'AI' }, { value: 1, name: 'Human' }]
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public gameService: GameService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    this.gameService.newGame();
  }

  public hitCell(cellIndex) {
    this.gameService.hitCell(cellIndex);
  }

  public get startingPlayer() {
    return this.gameService.startingPlayer;
  }

  public get maximizing() {
    return this.gameService.maximizing;
  }

  public get board() {
    return this.gameService.board;
  }

  public get player() {
    return this.gameService.player;
  }

  public get playerTurn() {
    return this.gameService.playerTurn
  }

  setValue(event) {
    console.log(event)
    this.gameService.startingPlayer = event.detail.value;
  }
}

