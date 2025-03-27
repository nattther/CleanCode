import { IMovementAction } from "./IMovementAction";
import { JoueurCommandHandler } from "../Joueur/JoueurCommandHandler";

export class TurnLeftAction implements IMovementAction {
  public execute(handler: JoueurCommandHandler): string {
    return handler.turnLeftAction();
  }
}
