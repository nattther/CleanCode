// DefaultDamageCalculator.ts
import { IDamageCalculator } from "./IDamageCalculator";

/**
 * Implémentation par défaut de IDamageCalculator.
 */
export class DefaultDamageCalculator implements IDamageCalculator {
  /**
   * Calcule les dégâts bruts.
   * @param attackerForce La force de l'attaquant.
   * @param defenderDefense La défense du défenseur.
   * @return number Les dégâts calculés.
   */
  public calculateDamage(attackerForce: number, defenderDefense: number): number {
    return Math.max(attackerForce - defenderDefense, 1);
  }
}
