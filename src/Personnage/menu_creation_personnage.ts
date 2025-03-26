import readline from "readline";
import { createCharacter } from "./creation_personnage";

export function lancerCreationPersonnage(): Promise<any> {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question("Entrez le nom de votre personnage (3-20 caractères) : ", (nom: string) => {
      console.log("\nChoisissez la classe du personnage :");
      console.log("1. Guerrier");
      console.log("2. Mage");
      console.log("3. Voleur");

      rl.question("Votre choix : ", (choix: string) => {
        const personnage = createCharacter(nom, choix);
        console.log("\nPersonnage créé :");
        console.log(personnage.afficherInfos());
        rl.close();
        resolve(personnage);
      });
    });
  });
}
