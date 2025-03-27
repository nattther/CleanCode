import { JoueurCommandHandler } from "../Joueur/JoueurCommandHandler";
export interface IMovementAction {
  execute(handler: JoueurCommandHandler): string;
}
