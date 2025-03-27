import { IMovementAction } from "./IMovementAction";
import { JoueurCommandHandler } from "../Joueur/JoueurCommandHandler";
import { Direction } from "./Direction";

export class WestAction implements IMovementAction {
  public execute(handler: JoueurCommandHandler): string {
    handler.getJoueur().setOrientation(Direction.Ouest);
    return handler.moveForward();
  }
}
