import { IDamageCalculator } from "./IDamageCalculator";
export class DefaultDamageCalculator implements IDamageCalculator {
  public calculateDamage(attackerForce: number, defenderDefense: number): number {
    return Math.max(attackerForce - defenderDefense, 1);
  }
}
