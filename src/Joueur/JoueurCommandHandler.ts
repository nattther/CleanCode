import { Joueur } from "./Joueur";
import { Terrain } from "../Terrain/terrain";
import { PlayerMovement } from "../Movement/PlayerMovement";
import { PlayerCommandProcessor } from "../Joueur/PlayerCommandProcessor";
import { CombatCommandProcessor } from "../CombatManager/CombatCommandProcessor";
import { CombatManager } from "../CombatManager/CombatManager";
import { Personnage } from "../Personnage/personnage";
import { IDamageCalculator } from "../CombatManager/IDamageCalculator";
import { DefaultDamageCalculator } from "../CombatManager/DefaultDamageCalculator";

export class JoueurCommandHandler {
  private joueur: Joueur;
  private movement: PlayerMovement;
  private commandProcessor: PlayerCommandProcessor;
  private combatProcessor: CombatCommandProcessor;
  private inCombat: boolean = false;
  private combatManager: CombatManager | null = null;

  /**
   * Constructeur.
   * @param joueur L'entité Joueur.
   * @param terrain Le terrain sur lequel évolue le joueur.
   */
  constructor(joueur: Joueur, terrain: Terrain) {
    this.joueur = joueur;
    // Pour gérer le cas où un monstre est rencontré lors d'un déplacement,
    // on passe en callback une fonction qui déclenche le démarrage du combat.
    this.movement = new PlayerMovement(
      joueur,
      joueur.personnage,
      terrain,
      (monster, newX, newY) => {
        return this.startCombat(monster, new DefaultDamageCalculator());
      }
    );
    // Utilise le handler dans le processor pour centraliser la logique des commandes.
    this.commandProcessor = new PlayerCommandProcessor(this);
    // Le CombatCommandProcessor est initialisé avec le handler pour accéder à l'état de combat.
    this.combatProcessor = new CombatCommandProcessor(this);
  }

  /**
   * Traite une commande selon le contexte (combat ou exploration).
   * @param command La commande saisie.
   * @return Le résultat de l'action.
   */
  public processCommand(command: string): string {
    if (this.inCombat) {
      return this.combatProcessor.processCommand(command);
    }
    return this.commandProcessor.processCommand(command);
  }

  /**
   * Démarre un combat contre un monstre.
   * @param monster Le personnage du monstre.
   * @param damageCalculator Le calculateur de dégâts à utiliser.
   * @return Le message initial de combat.
   */
  public startCombat(monster: Personnage, damageCalculator: IDamageCalculator): string {
    this.combatManager = new CombatManager(this.joueur.personnage, monster, damageCalculator);
    this.inCombat = true;
    return "Un monstre se dresse devant vous ! Choisissez votre action de combat : [P] Attaquer, [M] Défendre";
  }

  /**
   * Retourne l'instance de CombatManager en cours.
   */
  public getCombatManager(): CombatManager | null {
    return this.combatManager;
  }

  /**
   * Termine le combat en cours.
   */
  public endCombat(): void {
    this.inCombat = false;
    this.combatManager = null;
  }

  /**
   * Effectue un déplacement vers l'avant.
   */
  public moveForward(): string {
    return this.movement.moveForward();
  }

  /**
   * Tourne le joueur vers la gauche.
   */
  public turnLeftAction(): string {
    return this.movement.turnLeft();
  }

  /**
   * Tourne le joueur vers la droite.
   */
  public turnRightAction(): string {
    return this.movement.turnRight();
  }

  /**
   * Retourne l'entité Joueur.
   */
  public getJoueur(): Joueur {
    return this.joueur;
  }
}
