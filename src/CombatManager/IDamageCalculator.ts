// IDamageCalculator.ts
/**
 * Interface pour le calculateur de dégâts.
 */
export interface IDamageCalculator {
  /**
   * Calcule les dégâts en fonction de la force de l'attaquant et de la défense du défenseur.
   * @param attackerForce La force de l'attaquant.
   * @param defenderDefense La défense du défenseur.
   * @return number Les dégâts calculés.
   */
  calculateDamage(attackerForce: number, defenderDefense: number): number;
}
