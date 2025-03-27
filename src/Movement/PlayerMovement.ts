import { Joueur } from "../Joueur/Joueur";
import { Terrain } from "../Terrain/terrain";
import { MovementManager } from "./MovementManager";
import { Direction } from "./Direction";
import { Personnage } from "../Personnage/personnage";
import { CellContent } from "../Terrain/case";
import { MonsterHandler } from "../Terrain/MonsterHandler";
import { ObstacleHandler } from "../Terrain/ObstacleHandler ";
import { TreasureHandler } from "../Terrain/TreasureHandler";
import { EmptyHandler } from "../Terrain/EmptyHandler";

export class PlayerMovement {
  private movementManager: MovementManager;
  private handlers: Map<CellContent, CaseHandler>;

  constructor(
    private player: Joueur,
    private personnage: Personnage,
    terrain: Terrain,
    private onMonsterEncounter: (
      monster: Personnage,
      newX: number,
      newY: number
    ) => string
  ) {
    this.movementManager = new MovementManager(terrain);

    this.handlers = new Map<CellContent, CaseHandler>([
      [CellContent.Monstre, new MonsterHandler(this.onMonsterEncounter)],
      [CellContent.Tresor, new TreasureHandler()],
      [CellContent.Mur, new ObstacleHandler()],
      [CellContent.Vide, new EmptyHandler()],
    ]);
  }

  public moveForward(): string {
    const { newX, newY } = this.movementManager.calculateNewPosition(
      this.player.x,
      this.player.y,
      this.player.orientation
    );

    if (!this.movementManager.isWithinGrid(newX, newY)) {
      return this.movementManager.edgeMessage(this.player.orientation);
    }
    const grid = this.movementManager.getTerrain().getGrid();
    const cellContent = grid[newY][newX].content;

    const handler = this.handlers.get(cellContent) || new EmptyHandler();

    if (cellContent !== CellContent.Mur) {
      this.player.updatePosition(newX, newY);
    }

    let message = handler.handle(newX, newY);
    if (!message.includes(`(${newX}, ${newY})`)) {
      message += ` Votre position est maintenant (${newX}, ${newY}).`;
    }
    return message;
  }

  public turnLeft(): string {
    const leftOrder: Direction[] = [
      Direction.Nord,
      Direction.Ouest,
      Direction.Sud,
      Direction.Est,
    ];
    const currentIndex = leftOrder.indexOf(this.player.orientation);
    const newOrientation = leftOrder[(currentIndex + 1) % leftOrder.length];
    this.player.setOrientation(newOrientation);
    return `Vous faites maintenant face à ${newOrientation}.`;
  }

  public turnRight(): string {
    const rightOrder: Direction[] = [
      Direction.Nord,
      Direction.Est,
      Direction.Sud,
      Direction.Ouest,
    ];
    const currentIndex = rightOrder.indexOf(this.player.orientation);
    const newOrientation = rightOrder[(currentIndex + 1) % rightOrder.length];
    this.player.setOrientation(newOrientation);
    return `Vous faites maintenant face à ${newOrientation}.`;
  }
}
