
import { Personnage } from "../Personnage/personnage";
import { Monstre } from "./Monstre";

export function createMonster(): Personnage {
  return new Monstre("Monstre");
}
