import { PersonnageConstructor } from "./personnage";
import { Voleur } from "./Voleur";
import { Mage } from "./Mage";
import { Guerrier } from "./Guerrier";

export function createCharacter(name: string, choice: string) {
  const classOptions: { [key: string]: { name: string; constructeur: PersonnageConstructor } } = {
    "1": { name: "Guerrier", constructeur: Guerrier },
    "2": { name: "Mage", constructeur: Mage },
    "3": { name: "Voleur", constructeur: Voleur },
  };

  const option = classOptions[choice];
  if (option) {
    return new option.constructeur(name);
  } else {
    console.log("Choix invalide, création d'un Guerrier par défaut.");
    return new Guerrier(name);
  }
}
