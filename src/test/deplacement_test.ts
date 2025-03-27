import assert from "assert";
import { Terrain } from "../Terrain/terrain";
import { TerrainConfig } from "../Terrain/TerrainConfig";
import { Joueur } from "../Joueur/Joueur";
import { FakeGuerrier } from "./FakeGuerrier";
import { CellContent } from "../Terrain/case";
import { JoueurCommandHandler } from "../Joueur/JoueurCommandHandler";

function createEmptyTerrain(rows: number, cols: number): Terrain {
  const config: TerrainConfig = {
    rows,
    cols,
    contentProbabilities: {
      Vide: 1,
      Monstre: 0,
      Tresor: 0,
      Mur: 0,
    },
  };
  return new Terrain(config);
}

function acceptanceTest1(): void {
  const terrain = createEmptyTerrain(2, 1);
  const joueur = new Joueur(new FakeGuerrier("Arthur"), terrain, 0, 0);
  const handler = new JoueurCommandHandler(joueur, terrain);
  const message = handler.processCommand("N");
  assert.ok(message.includes("(0, 1)"), "Acceptance Test 1: Le joueur doit se déplacer vers (0, 1).");
  assert.strictEqual(joueur.x, 0, "Acceptance Test 1: x doit être 0.");
  assert.strictEqual(joueur.y, 1, "Acceptance Test 1: y doit être 1.");
  console.log("Acceptance Test 1 passé : Déplacement vers une case vide.");
}

function acceptanceTest2(): void {
  const terrain = createEmptyTerrain(2, 2);
  terrain.getGrid()[1][1].content = CellContent.Monstre;
  const joueur = new Joueur(new FakeGuerrier("Arthur"), terrain, 0, 1);
  const handler = new JoueurCommandHandler(joueur, terrain);
  const message = handler.processCommand("E");
  assert.ok(message.includes("Un monstre se dresse devant vous"), "Acceptance Test 2: Le message doit indiquer la présence d'un monstre.");
  assert.strictEqual(joueur.x, 1, "Acceptance Test 2: x deviens 1.");
  assert.strictEqual(joueur.y, 1, "Acceptance Test 2: y reste à 1.");
  console.log("Acceptance Test 2 passé : Déplacement vers une case contenant un monstre.");
}

function acceptanceTest3(): void {
  const terrain = createEmptyTerrain(1, 1);
  const joueur = new Joueur(new FakeGuerrier("Arthur"), terrain, 0, 0);
  const handler = new JoueurCommandHandler(joueur, terrain);
  const message = handler.processCommand("S");
  assert.ok(message.includes("bord du monde") || message.includes("ne pouvez pas aller plus"), "Acceptance Test 3: Message attendu pour déplacement hors grille.");
  assert.strictEqual(joueur.x, 0, "Acceptance Test 3: x reste à 0.");
  assert.strictEqual(joueur.y, 0, "Acceptance Test 3: y reste à 0.");
  console.log("Acceptance Test 3 passé : Déplacement hors de la grille.");
}

function acceptanceTest4(): void {
  const terrain = createEmptyTerrain(3, 2);
  const joueur = new Joueur(new FakeGuerrier("Arthur"), terrain, 0, 0);
  const handler = new JoueurCommandHandler(joueur, terrain);
  let message = handler.processCommand("N");
  assert.ok(message.includes("(0, 1)"), "Acceptance Test 4 - Étape 1: Déplacement vers (0,1) attendu.");
  message = handler.processCommand("E");
  assert.ok(message.includes("(1, 1)"), "Acceptance Test 4 - Étape 2: Déplacement vers (1,1) attendu.");
  message = handler.processCommand("N");
  assert.ok(message.includes("(1, 2)"), "Acceptance Test 4 - Étape 3: Déplacement vers (1,2) attendu.");
  assert.strictEqual(joueur.x, 1, "Acceptance Test 4: x doit être 1.");
  assert.strictEqual(joueur.y, 2, "Acceptance Test 4: y doit être 2.");
  console.log("Acceptance Test 4 passé : Enchaînement de déplacements valides.");
}

function acceptanceTest5(): void {
  const terrain = createEmptyTerrain(4, 2);
  terrain.getGrid()[3][1].content = CellContent.Tresor;
  const joueur = new Joueur(new FakeGuerrier("Arthur"), terrain, 1, 2);
  const handler = new JoueurCommandHandler(joueur, terrain);
  const message = handler.processCommand("N");
  assert.ok(message.includes("Vous avez trouvé un trésor"), "Acceptance Test 5: Le message doit indiquer la découverte d'un trésor.");
  assert.ok(message.includes("(1, 3)"), "Acceptance Test 5: Déplacement vers (1,3) attendu.");
  console.log("Acceptance Test 5 passé : Rencontre d'un trésor lors du déplacement.");
}

function acceptanceTest6(): void {
  const terrain = createEmptyTerrain(4, 3);
  terrain.getGrid()[3][2].content = CellContent.Mur;
  const joueur = new Joueur(new FakeGuerrier("Arthur"), terrain, 1, 3);
  const handler = new JoueurCommandHandler(joueur, terrain);
  const message = handler.processCommand("E");
  assert.ok(message.includes("Un obstacle vous bloque le passage"), "Acceptance Test 6: Le message doit indiquer un obstacle.");
  assert.strictEqual(joueur.x, 1, "Acceptance Test 6: x reste à 1.");
  assert.strictEqual(joueur.y, 3, "Acceptance Test 6: y reste à 3.");
  console.log("Acceptance Test 6 passé : Déplacement bloqué par un obstacle.");
}

function acceptanceTest7(): void {
  const terrain = createEmptyTerrain(5, 5);
  const joueur = new Joueur(new FakeGuerrier("Arthur"), terrain, 0, 4);
  const handler = new JoueurCommandHandler(joueur, terrain);
  const message = handler.processCommand("N");
  assert.ok(message.includes("bord du monde"), "Acceptance Test 7: Le message doit indiquer que le bord est atteint.");
  assert.strictEqual(joueur.x, 0, "Acceptance Test 7: x reste à 0.");
  assert.strictEqual(joueur.y, 4, "Acceptance Test 7: y reste à 4.");
  console.log("Acceptance Test 7 passé : Gestion des limites de la grille.");
}

function acceptanceTest8(): void {
  const terrain = createEmptyTerrain(5, 5);
  const joueur = new Joueur(new FakeGuerrier("Arthur"), terrain, 2, 2);
  const handler = new JoueurCommandHandler(joueur, terrain);
  let message = handler.processCommand("D");
  assert.ok(message.includes("E"), "Acceptance Test 8: Après 'D', l'orientation doit être E.");
  message = handler.processCommand("G");
  assert.ok(message.includes("N"), "Acceptance Test 8: Après 'G', l'orientation doit être N.");
  assert.strictEqual(joueur.x, 2, "Acceptance Test 8: x reste à 2.");
  assert.strictEqual(joueur.y, 2, "Acceptance Test 8: y reste à 2.");
  console.log("Acceptance Test 8 passé : Rotation et orientation du personnage.");
}

function acceptanceTest9(): void {
  const terrain = createEmptyTerrain(5, 5);
  const joueur = new Joueur(new FakeGuerrier("Arthur"), terrain, 2, 2);
  const handler = new JoueurCommandHandler(joueur, terrain);
  handler.processCommand("D");
  const message = handler.processCommand("A");
  assert.ok(message.includes("(3, 2)"), "Acceptance Test 9: Le déplacement vers (3,2) est attendu.");
  assert.strictEqual(joueur.x, 3, "Acceptance Test 9: x doit être 3.");
  assert.strictEqual(joueur.y, 2, "Acceptance Test 9: y doit être 2.");
  console.log("Acceptance Test 9 passé : Déplacement avec orientation.");
}

function acceptanceTest10(): void {
  const terrain = createEmptyTerrain(5, 5);
  const joueur = new Joueur(new FakeGuerrier("Arthur"), terrain, 0, 0);
  const handler = new JoueurCommandHandler(joueur, terrain);
  let message = handler.processCommand("A");
  assert.ok(message.includes("(0, 1)"), "Acceptance Test 10 - Étape 1: Déplacement vers (0,1) attendu.");
  message = handler.processCommand("D");
  assert.ok(message.includes("E"), "Acceptance Test 10 - Étape 2: Orientation E attendue.");
  message = handler.processCommand("A");
  assert.ok(message.includes("(1, 1)"), "Acceptance Test 10 - Étape 3: Déplacement vers (1,1) attendu.");
  message = handler.processCommand("G");
  assert.ok(message.includes("N"), "Acceptance Test 10 - Étape 4: Orientation N attendue.");
  message = handler.processCommand("A");
  assert.ok(message.includes("(1, 2)"), "Acceptance Test 10 - Étape 5: Déplacement vers (1,2) attendu.");
  message = handler.processCommand("A");
  assert.ok(message.includes("(1, 3)"), "Acceptance Test 10 - Étape 6: Déplacement vers (1,3) attendu.");
  assert.strictEqual(joueur.x, 1, "Acceptance Test 10: x doit être 1.");
  assert.strictEqual(joueur.y, 3, "Acceptance Test 10: y doit être 3.");
  console.log("Acceptance Test 10 passé : Série de commandes complexes.");
}

export function runAcceptanceTests(): void {
  acceptanceTest1();
  acceptanceTest2();
  acceptanceTest3();
  acceptanceTest4();
  acceptanceTest5();
  acceptanceTest6();
  acceptanceTest7();
  acceptanceTest8();
  acceptanceTest9();
  acceptanceTest10();
  console.log("Tous les tests d'acceptation du déplacement du personnage ont réussi.");
}

runAcceptanceTests();
