
/**
 * Enumération des types de contenu qu'une case du terrain peut contenir.
 */
export enum CellContent {
    Vide = "Vide",// La case est vide.
    Monstre = "Monstre",// La case contient un monstre.
    Tresor = "Tresor",// La case contient un trésor.
}
/**
 * Classe représentant une case (cellule) du terrain.
 * Chaque case possède un contenu et des indicateurs indiquant si un mur bloque l'accès
 * sur chacun de ses côtés (haut, bas, gauche, droite).
 */

export class Case {
    public content: CellContent;
    public blockedUp: boolean; // Bloqué par un mur en haut.
    public blockedDown: boolean; // Bloqué par un mur en bas.
    public blockedLeft: boolean; // Bloqué par un mur à gauche.
    public blockedRight: boolean; // Bloqué par un mur à droite.

    /**
     * Crée une nouvelle case avec un contenu et des murs éventuels sur chaque côté.
     *
     * @param content Le contenu de la case (par défaut : Vide).
     * @param blockedUp Indique si le côté supérieur est bloqué (par défaut : false).
     * @param blockedDown Indique si le côté inférieur est bloqué (par défaut : false).
     * @param blockedLeft Indique si le côté gauche est bloqué (par défaut : false).
     * @param blockedRight Indique si le côté droit est bloqué (par défaut : false).
     */
    constructor(
        content: CellContent = CellContent.Vide,
        blockedUp: boolean = false,
        blockedDown: boolean = false,
        blockedLeft: boolean = false,
        blockedRight: boolean = false
    ) {
        this.content = content;
        this.blockedUp = blockedUp;
        this.blockedDown = blockedDown;
        this.blockedLeft = blockedLeft;
        this.blockedRight = blockedRight;
    }
}
