import { Joueur } from "../Joueur/Joueur";
export interface IMovementAction {
  execute(joueur: Joueur): string;
}
