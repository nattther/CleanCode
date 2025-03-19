import { Joueur } from "../Joueur/Joueur";


/**
 * Interface définissant une action de mouvement réalisable par le joueur.
 */
export interface IMovementAction {
  /**
   * Exécute l'action de mouvement sur le joueur.
   *
   * @param joueur Instance du Joueur.
   * @returns Un message décrivant le résultat de l'action.
   */
  execute(joueur: Joueur): string;
}
