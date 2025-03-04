/**
 * Enumération des types de contenu qu'une case du terrain peut contenir.
 */
export enum CellContent {
    Vide = "Vide",       // La case est vide.
    Monstre = "Monstre", // La case contient un monstre.
    Tresor = "Tresor",   // La case contient un trésor.
    Mur = "Mur"          // La case est un mur (inaccessible).
}

/**
 * Classe représentant une case (cellule) du terrain.
 */
export class Case {
    public content: CellContent;

    /**
     * Crée une nouvelle case avec un contenu.
     *
     * @param content Le contenu de la case (par défaut : Vide).
     */
    constructor(content: CellContent = CellContent.Vide) {
        this.content = content;
    }
}
