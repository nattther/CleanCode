import { IDamageCalculator } from "./IDamageCalculator";

/**
 * Classe concrète pour le calcul des dégâts.
 */
export class DamageCalculator implements IDamageCalculator {
  /**
   * Calcule les dégâts infligés en soustrayant la moitié de la défense.
   *
   * @param attack Statistique d'attaque.
   * @param defense Statistique de défense.
   * @returns Le nombre de points de dégâts (au moins 1).
   */
  calculateDamage(attack: number, defense: number): number {
    const rawDamage = attack - Math.floor(defense / 2);
    return rawDamage > 0 ? rawDamage : 1;
  }
}
