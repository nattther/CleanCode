import { IMovementAction } from "./IMovementAction";

import { JoueurCommandHandler } from "../Joueur/JoueurCommandHandler";


export class AdvanceAction implements IMovementAction {
  public execute(handler: JoueurCommandHandler): string {
    return handler.moveForward();
  }
}
