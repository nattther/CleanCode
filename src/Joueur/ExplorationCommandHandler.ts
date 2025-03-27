import { Joueur } from "./Joueur";
import { Terrain } from "../Terrain/terrain";
import { PlayerMovement } from "../Movement/PlayerMovement";
import { PlayerCommandProcessor } from "./PlayerCommandProcessor";
import { Personnage } from "../Personnage/personnage";

export class ExplorationCommandHandler {
  private movement: PlayerMovement;
  private commandProcessor: PlayerCommandProcessor;

  constructor(private joueur: Joueur, terrain: Terrain, onEncounter: (monster: Personnage, newX: number, newY: number) => string) {
    this.movement = new PlayerMovement(joueur, joueur.personnage, terrain, (monster, newX, newY) => {
      return onEncounter(monster, newX, newY);
    });
    this.commandProcessor = new PlayerCommandProcessor(this);
  }

  public processCommand(command: string): string {
    return this.commandProcessor.processCommand(command);
  }

  public moveForward(): string {
    return this.movement.moveForward();
  }

  public turnLeft(): string {
    return this.movement.turnLeft();
  }

  public turnRight(): string {
    return this.movement.turnRight();
  }

  public getJoueur(): Joueur {
    return this.joueur;
  }
}
