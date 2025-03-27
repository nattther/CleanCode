import { ExplorationCommandHandler } from "../Joueur/ExplorationCommandHandler";
export interface IMovementAction {
  execute(handler: ExplorationCommandHandler): string;
}
