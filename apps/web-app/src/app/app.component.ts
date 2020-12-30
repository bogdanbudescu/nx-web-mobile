import { Component } from '@angular/core';
import { Board, GameService, Player } from '@nx-ionic/game'

@Component({
  selector: 'nx-ionic-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public players = [{ value: 0, name: 'AI' }, { value: 1, name: 'Human' }]
  constructor(
    public gameService: GameService
  ) { }

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

}
