/**
 * Interface pour le calcul des dégâts.
 */
export interface IDamageCalculator {
    /**
     * Calcule les dégâts infligés selon une formule.
     *
     * @param attack Statistique d'attaque.
     * @param defense Statistique de défense.
     * @returns Le nombre de points de dégâts infligés.
     */
    calculateDamage(attack: number, defense: number): number;
  }
  