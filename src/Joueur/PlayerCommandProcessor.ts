import { Joueur } from "./Joueur";
import { IMovementAction } from "../Movement/IMovementAction";
import { NorthAction } from "../Movement/NorthAction";
import { SouthAction } from "../Movement/SouthAction";
import { EastAction } from "../Movement/EastAction";
import { WestAction } from "../Movement/WestAction";
import { AdvanceAction } from "../Movement/AdvanceAction";
import { TurnLeftAction } from "../Movement/TurnLeftAction";
import { TurnRightAction } from "../Movement/TurnRightAction";


export class PlayerCommandProcessor {
  private player: Joueur;

  constructor(player: Joueur) {
    this.player = player;
  }

  public processCommand(command: string): string {
    command = command.toUpperCase();
    const commandActions: { [key: string]: IMovementAction } = {
      "N": new NorthAction(),
      "S": new SouthAction(),
      "E": new EastAction(),
      "O": new WestAction(),
      "A": new AdvanceAction(),
      "G": new TurnLeftAction(),
      "D": new TurnRightAction(),
    };

    const action = commandActions[command];
    return action ? action.execute(this.player) : "Commande invalide.";
  }
}
