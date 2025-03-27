export class TreasureHandler implements CaseHandler {
    handle(newX: number, newY: number): string {
      return "Vous avez trouvé un trésor !";
    }
  }