import { CombatManager } from "./CombatManager";

/**
 * Interface définissant une action réalisable par le joueur.
 */
export interface IPlayerAction {
    /**
     * Exécute l'action dans le contexte du combat.
     *
     * @param combatManager L'instance du CombatManager.
     * @returns Le message décrivant le résultat de l'action.
     */
    execute(combatManager: CombatManager): string;
  }
  
  // Pour éviter une référence circulaire, vous pouvez définir CombatManager dans un type
  // ou utiliser une importation différée dans un projet réel.
  