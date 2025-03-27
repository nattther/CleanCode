export class EmptyHandler implements CaseHandler {
    handle(newX: number, newY: number): string {
      return `Vous êtes maintenant en position (${newX}, ${newY}).`;
    }
}