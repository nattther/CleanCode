// monsterFactory.ts
import { Personnage } from "../Personnage/personnage";
import { Monstre } from "./Monstre";


/**
 * Crée une instance de monstre.
 * @return Personnage Représente le monstre.
 */
export function createMonster(): Personnage {
  return new Monstre("Monstre");
}
