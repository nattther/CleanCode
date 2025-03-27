import readline from "readline";
import { createCharacter } from "./creation_personnage";

function askQuestion(rl: readline.Interface, query: string): Promise<string> {
  return new Promise(resolve => rl.question(query, resolve));
}

export async function lancerCreationPersonnage(): Promise<any> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  
  let personnage;
  while (true) {
    const nom = await askQuestion(rl, "Entrez le nom de votre personnage (3-20 caractères) : ");
    if (nom.length < 3 || nom.length > 20) {
      console.log("Le nom doit être entre 3 et 20 caractères.");
      continue;
    }
    
    console.log("\nChoisissez la classe du personnage :");
    console.log("1. Guerrier");
    console.log("2. Mage");
    console.log("3. Voleur");
    
    const choix = await askQuestion(rl, "Votre choix : ");
    if (!["1", "2", "3"].includes(choix)) {
      console.log("Choix invalide. Veuillez choisir 1, 2 ou 3.");
      continue;
    }
    
    personnage = createCharacter(nom, choix);
    console.log("\nPersonnage créé :");
    console.log(personnage.afficherInfos());
    break;
  }
  
  rl.close();
  return personnage;
}
