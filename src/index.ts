
import readline from "readline";
import { createTerrain } from "./Terrain/create_terrain";
import { Joueur } from "./Action_User/Joueur";
import { lancerCreationPersonnage } from "./Personnage/menu_creation_personnage";

async function main(): Promise<void> {
  // Génération du terrain
  const terrain = createTerrain();

  // Création du personnage
  const personnage = await lancerCreationPersonnage();

  // Création du joueur avec le personnage et le terrain
  const joueur = new Joueur(personnage, terrain);

  // Interface readline pour gérer les commandes de mouvement
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log("\nBienvenue dans le jeu !");
  console.log("Commandes disponibles : N, S, E, O, A, G, D, Q (pour quitter)");

  rl.setPrompt("Entrez une commande : ");
  rl.prompt();

  rl.on("line", (line: string) => {
    const command = line.trim().toUpperCase();
    if (command === "Q") {
      console.log("Fin du jeu.");
      rl.close();
    } else {
      const result = joueur.processCommand(command);
      console.log(result);
      rl.prompt();
    }
  });
}

main();
