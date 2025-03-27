export class ObstacleHandler implements CaseHandler {
    handle(newX: number, newY: number): string {
      return "Un obstacle vous bloque le passage. Vous ne pouvez pas aller par là.";
    }
  }