import { IDamageCalculator } from "./IDamageCalculator";


export class DamageCalculator implements IDamageCalculator {
  calculateDamage(attack: number, defense: number): number {
    const rawDamage = attack - Math.floor(defense / 2);
    return rawDamage > 0 ? rawDamage : 1;
  }
}
