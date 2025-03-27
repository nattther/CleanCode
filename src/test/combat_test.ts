import assert from "assert";
import { Terrain } from "../Terrain/terrain";
import { TerrainConfig } from "../Terrain/TerrainConfig";
import { Joueur } from "../Joueur/Joueur";
import { FakeGuerrier } from "./FakeGuerrier";
import { Monstre } from "../Monstre/Monstre";
import { JoueurCommandHandler } from "../Joueur/JoueurCommandHandler";
import { DefaultDamageCalculator } from "../CombatManager/DefaultDamageCalculator";

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

function acceptanceCombatTestAttack(): void {
  const terrain = createEmptyTerrain(1, 1);
  const joueur = new Joueur(new FakeGuerrier("Arthur"), terrain, 0, 0);
  const handler = new JoueurCommandHandler(joueur, terrain);
  const monstre = new Monstre("Goblin");
  handler.startCombat(monstre, new DefaultDamageCalculator());
  const message = handler.processCommand("P");
  assert.strictEqual(monstre.stats.sante, 8, "Après l'attaque, le monstre doit avoir 8 PV.");
  assert.strictEqual(joueur.personnage.stats.sante, 147, "Après la riposte du monstre, le joueur doit avoir 147 PV.");
  console.log("Acceptance Combat Test – Attack réussi.");
}

function acceptanceCombatTestDefense(): void {
  const terrain = createEmptyTerrain(1, 1);
  const joueur = new Joueur(new FakeGuerrier("Arthur"), terrain, 0, 0);
  const handler = new JoueurCommandHandler(joueur, terrain);
  const monstre = new Monstre("Goblin");
  handler.startCombat(monstre, new DefaultDamageCalculator());
  const message = handler.processCommand("M");
  assert.strictEqual(monstre.stats.sante, 20, "Après une défense, le monstre doit conserver 20 PV.");
  assert.strictEqual(joueur.personnage.stats.sante, 149, "Après une défense, le joueur doit avoir 149 PV.");
  console.log("Acceptance Combat Test – Defense réussi.");
}

function acceptanceCombatTestVictory(): void {
  const terrain = createEmptyTerrain(1, 1);
  const joueur = new Joueur(new FakeGuerrier("Arthur"), terrain, 0, 0);
  const handler = new JoueurCommandHandler(joueur, terrain);
  const monstre = new Monstre("Goblin");
  monstre.stats.sante = 10;
  handler.startCombat(monstre, new DefaultDamageCalculator());
  const message = handler.processCommand("P");
  assert.strictEqual(monstre.stats.sante, 0, "Après l'attaque, le monstre doit avoir 0 PV.");
  assert.ok(message.includes("Combat terminé") && message.includes("joueur"), "Le combat doit se terminer avec la victoire du joueur.");
  console.log("Acceptance Combat Test – Victory réussi.");
}

function acceptanceCombatTestDefeat(): void {
  const terrain = createEmptyTerrain(1, 1);
  const joueur = new Joueur(new FakeGuerrier("Arthur"), terrain, 0, 0);
  const handler = new JoueurCommandHandler(joueur, terrain);
  const monstre = new Monstre("Goblin");
  joueur.personnage.stats.sante = 2;
  handler.startCombat(monstre, new DefaultDamageCalculator());
  const message = handler.processCommand("P");
  assert.strictEqual(joueur.personnage.stats.sante, 0, "Après l'attaque du monstre, le joueur doit avoir 0 PV.");
  assert.ok(message.includes("Combat terminé") && message.includes("monstre"), "Le combat doit se terminer avec la victoire du monstre.");
  console.log("Acceptance Combat Test – Defeat réussi.");
}

export function runCombatAcceptanceTests(): void {
  acceptanceCombatTestAttack();
  acceptanceCombatTestDefense();
  acceptanceCombatTestVictory();
  acceptanceCombatTestDefeat();
  console.log("Tous les tests d'acceptation du système de combat ont réussi.");
}

runCombatAcceptanceTests();
