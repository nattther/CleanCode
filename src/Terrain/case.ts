export enum CellContent {
    Vide = "Vide",       // La case est vide.
    Monstre = "Monstre", // La case contient un monstre.
    Tresor = "Tresor",   // La case contient un trésor.
    Mur = "Mur"          // La case est un mur (inaccessible).
}

export class Case {
    public content: CellContent;

    constructor(content: CellContent = CellContent.Vide) {
        this.content = content;
    }
}
