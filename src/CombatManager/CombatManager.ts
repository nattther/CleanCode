import { Personnage } from "../Personnage/personnage";
import { IDamageCalculator } from "./IDamageCalculator";

/**
 * Classe gérant le système de combat au tour par tour entre un joueur et un monstre.
 * Ce gestionnaire est désormais extensible via des commandes d'actions du joueur.
 */
export class CombatManager {
  private player: Personnage;
  private monster: Personnage;
  private isPlayerDefending: boolean = false;
  private damageCalculator: IDamageCalculator;

  /**
   * Crée une instance de CombatManager.
   *
   * @param player L'instance de Personnage du joueur.
   * @param monster L'instance de Personnage représentant le monstre.
   * @param damageCalculator Instance implémentant IDamageCalculator pour calculer les dégâts.
   */
  constructor(
    player: Personnage,
    monster: Personnage,
    damageCalculator: IDamageCalculator
  ) {
    this.player = player;
    this.monster = monster;
    this.damageCalculator = damageCalculator;
  }

  /**
   * Exécute une action du joueur.
   *
   * @param action L'action du joueur à exécuter.
   * @returns Le message résultant de l'exécution de l'action.
   */
  public executeAction(action: { execute(combatManager: CombatManager): string }): string {
    return action.execute(this);
  }

  /**
   * Exécute l'attaque du joueur.
   *
   * @returns Un message décrivant le résultat de l'attaque.
   */
  public doAttack(): string {
    const damage = this.damageCalculator.calculateDamage(
      this.player.stats.force,
      this.monster.stats.defense
    );
    this.monster.stats.sante = Math.max(this.monster.stats.sante - damage, 0);
    let message = `Le joueur attaque et inflige ${damage} points de dégâts. Le monstre a ${this.monster.stats.sante} PV restants.`;

    // Si le monstre n'est pas vaincu, il riposte.
    message += this.monster.stats.sante > 0 ? "\n" + this.monsterTurn() : "\nLe monstre est vaincu !";
    return message;
  }

  /**
   * Exécute la défense du joueur.
   *
   * @returns Un message décrivant l'action de défense et la riposte du monstre.
   */
  public doDefend(): string {
    this.isPlayerDefending = true;
    let message = "Le joueur se prépare à défendre. ";
    message += this.monsterTurn();
    return message;
  }

  /**
   * Simule la riposte du monstre après l'action du joueur.
   *
   * @returns Un message décrivant l'attaque du monstre.
   */
  private monsterTurn(): string {
    if (this.isCombatOver()) {
      return "";
    }
    let damage = this.damageCalculator.calculateDamage(
      this.monster.stats.force,
      this.player.stats.defense
    );
    if (this.isPlayerDefending) {
      damage = Math.floor(damage / 2);
      this.isPlayerDefending = false;
    }
    this.player.stats.sante = Math.max(this.player.stats.sante - damage, 0);
    return `Le monstre attaque et inflige ${damage} points de dégâts. Le joueur a ${this.player.stats.sante} PV restants.`;
  }

  /**
   * Vérifie si le combat est terminé (si le joueur ou le monstre est à 0 PV).
   *
   * @returns True si le combat est terminé, sinon false.
   */
  public isCombatOver(): boolean {
    return this.player.stats.sante <= 0 || this.monster.stats.sante <= 0;
  }

  /**
   * Retourne le gagnant du combat.
   *
   * @returns "joueur" si le joueur gagne, "monstre" si le monstre gagne, ou null si le combat continue.
   */
  public getWinner(): "joueur" | "monstre" | null {
    if (this.player.stats.sante <= 0) {
      return "monstre";
    } else if (this.monster.stats.sante <= 0) {
      return "joueur";
    }
    return null;
  }
}
