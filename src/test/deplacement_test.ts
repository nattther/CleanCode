import assert from "assert";
import { Terrain, TerrainConfig } from "../Terrain/terrain";
import { Joueur } from "../Joueur/Joueur";
import { FakeGuerrier } from "./FakeGuerrier";
import { CellContent } from "../Terrain/case";

/**
 * Fonction utilitaire pour créer un terrain avec toutes les cases forcées à être vides.
 * On fixe la probabilité d'un mur à 0 dans contentProbabilities.
 *
 * @param rows Nombre de lignes.
 * @param cols Nombre de colonnes.
 * @returns Une instance de Terrain.
 */
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

/* ---------------- Acceptance Test 1 ---------------- */
/**
 * Scénario : Déplacement vers une case adjacente vide.
 * Préconditions : Le personnage est à (0, 0) et la case (0, 1) est vide.
 * Action : Commande "N".
 * Résultat attendu : Le personnage se retrouve en (0, 1) et un message l'indique.
 */
function acceptanceTest1(): void {
  const terrain = createEmptyTerrain(2, 1); // Grille 2x1
  const joueur = new Joueur(new FakeGuerrier("Arthur"), terrain, 0, 0);
  const message = joueur.processCommand("N");
  assert.ok(
    message.includes("(0, 1)"),
    "Acceptance Test 1: Le joueur doit se déplacer vers (0, 1)."
  );
  assert.strictEqual(joueur.x, 0, "Acceptance Test 1: x doit être 0.");
  assert.strictEqual(joueur.y, 1, "Acceptance Test 1: y doit être 1.");
  console.log("Acceptance Test 1 passé : Déplacement vers une case vid.");
}

/* ---------------- Acceptance Test 2 ---------------- */
/**
 * Scénario : Déplacement vers une case contenant un monstre.
 * Préconditions : Le personnage est à (0, 1) et la case (1, 1) contient un monstre.
 * Action : Commande "E".
 * Résultat attendu : Un message indique "Un monstre bloque votre chemin ! Vous devez le vaincre pour avancer."
 * et le personnage ne se déplace pas.
 */
function acceptanceTest2(): void {
  const terrain = createEmptyTerrain(2, 2); // Grille 2x2
  // Forcer la case (1,1) à contenir un monstre
  terrain.getGrid()[1][1].content = CellContent.Monstre;
  const joueur = new Joueur(new FakeGuerrier("Arthur"), terrain, 0, 1);
  const message = joueur.processCommand("E");
  assert.ok(
    message.includes("Un monstre bloque votre chemin"),
    "Acceptance Test 2: Le message doit indiquer la présence d'un monstre."
  );
  // Le joueur ne doit pas changer de position
  assert.strictEqual(joueur.x, 0, "Acceptance Test 2: x reste à 0.");
  assert.strictEqual(joueur.y, 1, "Acceptance Test 2: y reste à 1.");
  console.log("Acceptance Test 2 passé : Déplacement vers une case contenant un monstre.");
}

/* ---------------- Acceptance Test 3 ---------------- */
/**
 * Scénario : Tentative de déplacement hors de la grille.
 * Préconditions : Le personnage est à (0, 0) dans une grille 1x1.
 * Action : Commande "S" (déplacement vers le Sud, hors grille).
 * Résultat attendu : Un message d'erreur indiquant que le bord est atteint et le personnage reste en (0, 0).
 */
function acceptanceTest3(): void {
  const terrain = createEmptyTerrain(1, 1); // Grille 1x1
  const joueur = new Joueur(new FakeGuerrier("Arthur"), terrain, 0, 0);
  const message = joueur.processCommand("S"); // (0,0) -> (0,-1)
  assert.ok(
    message.includes("bord du monde") || message.includes("ne pouvez pas aller plus"),
    "Acceptance Test 3: Message attendu pour déplacement hors grille."
  );
  assert.strictEqual(joueur.x, 0, "Acceptance Test 3: x reste à 0.");
  assert.strictEqual(joueur.y, 0, "Acceptance Test 3: y reste à 0.");
  console.log("Acceptance Test 3 passé : Déplacement hors de la grille.");
}

/* ---------------- Acceptance Test 4 ---------------- */
/**
 * Scénario : Enchaînement de déplacements valides.
 * Préconditions : Le personnage est à (0, 0) et les cases (0,1), (1,1) et (1,2) sont vides.
 * Actions : Commandes "N", "E", "N".
 * Résultat attendu : Le personnage se déplace successivement vers (0,1), (1,1) puis (1,2).
 */
function acceptanceTest4(): void {
  // Grille de 3 lignes et 2 colonnes
  const terrain = createEmptyTerrain(3, 2);
  const joueur = new Joueur(new FakeGuerrier("Arthur"), terrain, 0, 0);
  
  let message = joueur.processCommand("N"); // (0,0) -> (0,1)
  assert.ok(message.includes("(0, 1)"), "Acceptance Test 4 - Étape 1: Déplacement vers (0,1) attendu.");
  
  message = joueur.processCommand("E"); // (0,1) -> (1,1)
  assert.ok(message.includes("(1, 1)"), "Acceptance Test 4 - Étape 2: Déplacement vers (1,1) attendu.");
  
  message = joueur.processCommand("N"); // (1,1) -> (1,2)
  assert.ok(message.includes("(1, 2)"), "Acceptance Test 4 - Étape 3: Déplacement vers (1,2) attendu.");
  
  assert.strictEqual(joueur.x, 1, "Acceptance Test 4: x doit être 1.");
  assert.strictEqual(joueur.y, 2, "Acceptance Test 4: y doit être 2.");
  console.log("Acceptance Test 4 passé : Enchaînement de déplacements valides.");
}

/* ---------------- Acceptance Test 5 ---------------- */
/**
 * Scénario : Rencontre d'un trésor lors du déplacement.
 * Préconditions : Le personnage est à (1,2) et la case (1,3) contient un trésor.
 * Action : Commande "N".
 * Résultat attendu : Le personnage se déplace à (1,3) et un message indique "Vous avez trouvé un trésor ! Vous êtes maintenant en position (1, 3)."
 */
function acceptanceTest5(): void {
  const terrain = createEmptyTerrain(4, 2); // Grille 4x2
  // Forcer la case (1,3) à contenir un trésor
  terrain.getGrid()[3][1].content = CellContent.Tresor;
  const joueur = new Joueur(new FakeGuerrier("Arthur"), terrain, 1, 2);
  const message = joueur.processCommand("N"); // (1,2) -> (1,3)
  assert.ok(
    message.includes("Vous avez trouvé un trésor"),
    "Acceptance Test 5: Le message doit indiquer la découverte d'un trésor."
  );
  assert.ok(message.includes("(1, 3)"), "Acceptance Test 5: Déplacement vers (1,3) attendu.");
  console.log("Acceptance Test 5 passé : Rencontre d'un trésor lors du déplacement.");
}

/* ---------------- Acceptance Test 6 ---------------- */
/**
 * Scénario : Déplacement bloqué par un obstacle.
 * Préconditions : Le personnage est à (1,3) et la case de destination vers l'Est (2,3) contient un mur.
 * Action : Commande "E".
 * Résultat attendu : Le déplacement est refusé et le message "Un obstacle vous bloque le passage. Vous ne pouvez pas aller par là." est affiché.
 */
function acceptanceTest6(): void {
  const terrain = createEmptyTerrain(4, 3); // Grille 4x3
  // Pour bloquer le déplacement de (1,3) vers l'Est, on force la case destination (2,3) à contenir un mur.
  terrain.getGrid()[3][2].content = CellContent.Mur;
  const joueur = new Joueur(new FakeGuerrier("Arthur"), terrain, 1, 3);
  const message = joueur.processCommand("E");
  assert.ok(
    message.includes("Un obstacle vous bloque le passage"),
    "Acceptance Test 6: Le message doit indiquer un obstacle."
  );
  assert.strictEqual(joueur.x, 1, "Acceptance Test 6: x reste à 1.");
  assert.strictEqual(joueur.y, 3, "Acceptance Test 6: y reste à 3.");
  console.log("Acceptance Test 6 passé : Déplacement bloqué par un obstacle.");
}

/* ---------------- Acceptance Test 7 ---------------- */
/**
 * Scénario : Gestion des limites de la grille.
 * Préconditions : Grille de 5x5, le personnage est à (0,4).
 * Action : Commande "N".
 * Résultat attendu : Le déplacement est refusé avec un message indiquant que le bord est atteint et le personnage reste en (0,4).
 */
function acceptanceTest7(): void {
  const terrain = createEmptyTerrain(5, 5);
  const joueur = new Joueur(new FakeGuerrier("Arthur"), terrain, 0, 4);
  const message = joueur.processCommand("N"); // (0,4) -> (0,5) invalide
  assert.ok(
    message.includes("bord du monde"),
    "Acceptance Test 7: Le message doit indiquer que le bord est atteint."
  );
  assert.strictEqual(joueur.x, 0, "Acceptance Test 7: x reste à 0.");
  assert.strictEqual(joueur.y, 4, "Acceptance Test 7: y reste à 4.");
  console.log("Acceptance Test 7 passé : Gestion des limites de la grille.");
}

/* ---------------- Acceptance Test 8 ---------------- */
/**
 * Scénario : Rotation et orientation du personnage.
 * Préconditions : Le personnage est à (2,2) et fait face au Nord par défaut.
 * Actions : Commande "D" pour tourner à droite (devient Est), puis "G" pour tourner à gauche (retour au Nord).
 * Résultat attendu : L'orientation change sans déplacement.
 */
function acceptanceTest8(): void {
  const terrain = createEmptyTerrain(5, 5);
  const joueur = new Joueur(new FakeGuerrier("Arthur"), terrain, 2, 2);
  let message = joueur.processCommand("D"); // Tourner à droite → Orientation E
  assert.ok(
    message.includes("E"),
    "Acceptance Test 8: Après 'D', l'orientation doit être E."
  );
  message = joueur.processCommand("G"); // Tourner à gauche → Orientation N
  assert.ok(
    message.includes("N"),
    "Acceptance Test 8: Après 'G', l'orientation doit être N."
  );
  // La position ne doit pas changer
  assert.strictEqual(joueur.x, 2, "Acceptance Test 8: x reste à 2.");
  assert.strictEqual(joueur.y, 2, "Acceptance Test 8: y reste à 2.");
  console.log("Acceptance Test 8 passé : Rotation et orientation du personnage.");
}

/* ---------------- Acceptance Test 9 ---------------- */
/**
 * Scénario : Déplacement avec orientation.
 * Préconditions : Le personnage est à (2,2) et orienté vers l'Est.
 * Action : Commande "A" pour avancer dans la direction actuelle.
 * Résultat attendu : Le personnage se déplace à (3,2).
 */
function acceptanceTest9(): void {
  const terrain = createEmptyTerrain(5, 5);
  const joueur = new Joueur(new FakeGuerrier("Arthur"), terrain, 2, 2);
  joueur.processCommand("D"); // Tourner à droite → Orientation E
  const message = joueur.processCommand("A"); // Avancer vers l'Est → (3,2)
  assert.ok(
    message.includes("(3, 2)"),
    "Acceptance Test 9: Le déplacement vers (3,2) est attendu."
  );
  assert.strictEqual(joueur.x, 3, "Acceptance Test 9: x doit être 3.");
  assert.strictEqual(joueur.y, 2, "Acceptance Test 9: y doit être 2.");
  console.log("Acceptance Test 9 passé : Déplacement avec orientation.");
}

/* ---------------- Acceptance Test 10 ---------------- */
/**
 * Scénario : Série de commandes complexes.
 * Préconditions : Le personnage est à (0,0), orienté Nord.
 * Actions : Séquence "A", "D", "A", "G", "A", "A".
 *   - Étape 1 : Avancer → (0,1)
 *   - Étape 2 : Tourner à droite → Orientation E
 *   - Étape 3 : Avancer → (1,1)
 *   - Étape 4 : Tourner à gauche → Orientation N
 *   - Étape 5 : Avancer → (1,2)
 *   - Étape 6 : Avancer → (1,3)
 * Résultat attendu : Les déplacements et orientations sont corrects à chaque étape.
 */
function acceptanceTest10(): void {
  const terrain = createEmptyTerrain(5, 5);
  const joueur = new Joueur(new FakeGuerrier("Arthur"), terrain, 0, 0);
  
  let message = joueur.processCommand("A"); // Étape 1 : (0,0) -> (0,1)
  assert.ok(message.includes("(0, 1)"), "Acceptance Test 10 - Étape 1: Déplacement vers (0,1) attendu.");
  
  message = joueur.processCommand("D"); // Étape 2 : tourner à droite → Orientation E
  assert.ok(message.includes("E"), "Acceptance Test 10 - Étape 2: Orientation E attendue.");
  
  message = joueur.processCommand("A"); // Étape 3 : (0,1) -> (1,1)
  assert.ok(message.includes("(1, 1)"), "Acceptance Test 10 - Étape 3: Déplacement vers (1,1) attendu.");
  
  message = joueur.processCommand("G"); // Étape 4 : tourner à gauche → Orientation N
  assert.ok(message.includes("N"), "Acceptance Test 10 - Étape 4: Orientation N attendue.");
  
  message = joueur.processCommand("A"); // Étape 5 : (1,1) -> (1,2)
  assert.ok(message.includes("(1, 2)"), "Acceptance Test 10 - Étape 5: Déplacement vers (1,2) attendu.");
  
  message = joueur.processCommand("A"); // Étape 6 : (1,2) -> (1,3)
  assert.ok(message.includes("(1, 3)"), "Acceptance Test 10 - Étape 6: Déplacement vers (1,3) attendu.");
  
  assert.strictEqual(joueur.x, 1, "Acceptance Test 10: x doit être 1.");
  assert.strictEqual(joueur.y, 3, "Acceptance Test 10: y doit être 3.");
  console.log("Acceptance Test 10 passé : Série de commandes complexes.");
}

/* ---------------- Exécution de tous les tests ---------------- */
function runAcceptanceTests(): void {
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
