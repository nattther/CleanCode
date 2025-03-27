import readline from "readline";
import { createTerrain } from "./Terrain/create_terrain";
import { Joueur } from "./Joueur/Joueur";
import { lancerCreationPersonnage } from "./Personnage/menu_creation_personnage";
import { GameCommandHandler } from "./Joueur/GameCommandHandler";

async function main(): Promise<void> {
  const terrain = createTerrain();
  const personnage = await lancerCreationPersonnage();
  const joueur = new Joueur(personnage, terrain);
  const handler = new GameCommandHandler(joueur, terrain);

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
      const result = handler.processCommand(command);
      console.log(result);
      rl.prompt();
    }
  });
}

main();
