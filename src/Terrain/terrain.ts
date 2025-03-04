import { Case, CellContent } from "./case";

/**
 * Interface de configuration pour le terrain.
 * La probabilité d'un type de contenu spécifique, y compris 'Mur', est intégrée dans contentProbabilities.
 */
export interface TerrainConfig {
    rows: number; // Nombre de lignes du terrain.
    cols: number; // Nombre de colonnes du terrain.
    contentProbabilities?: { [key in CellContent]?: number }; // Probabilités pour chaque contenu.
}


/**
 * Classe représentant le terrain.
 * Génère une grille de cases en choisissant aléatoirement leur contenu selon les probabilités définies.
 */
export class Terrain {
    private grid: Case[][];
    private rows: number;
    private cols: number;
    private contentProbabilities?: { [key in CellContent]?: number };

    /**
     * Crée un nouveau terrain selon la configuration.
     *
     * @param config La configuration du terrain.
     */
    constructor(config: TerrainConfig) {
        this.rows = config.rows;
        this.cols = config.cols;
        this.contentProbabilities = config.contentProbabilities;
        this.grid = [];
        this.buildGrid();
    }

    /**
     * Construit la grille de cases du terrain.
     * Chaque case est créée en choisissant son contenu selon la distribution définie dans contentProbabilities.
     */
    private buildGrid(): void {
        for (let row = 0; row < this.rows; row++) {
            const rowArray: Case[] = [];
            for (let col = 0; col < this.cols; col++) {
                const cellContent = this.getRandomContent();
                rowArray.push(new Case(cellContent));
            }
            this.grid.push(rowArray);
        }
    }

    /**
     * Retourne aléatoirement un contenu parmi les valeurs de l'énumération CellContent,
     * en utilisant la distribution de probabilités si elle est définie.
     *
     * @return {CellContent} Le contenu aléatoire choisi.
     */
    private getRandomContent(): CellContent {
        const contents: CellContent[] = [
            CellContent.Vide,
            CellContent.Monstre,
            CellContent.Tresor,
            CellContent.Mur
        ];
        return this.pickContent(contents);
    }

    /**
     * Sélectionne un contenu à partir d'une liste en utilisant les probabilités définies.
     * Si aucune probabilité n'est définie ou si la somme des poids est nulle, la sélection se fait de manière uniforme.
     *
     * @param contents Liste des contenus possibles.
     * @return {CellContent} Le contenu choisi.
     */
    private pickContent(contents: CellContent[]): CellContent {
        if (this.contentProbabilities) {
            let totalWeight = 0;
            const weights = contents.map((content) => {
                const weight = this.contentProbabilities![content] ?? 0;
                totalWeight += weight;
                return weight;
            });
            if (totalWeight > 0) {
                const randomWeight = Math.random() * totalWeight;
                let cumulative = 0;
                for (let i = 0; i < contents.length; i++) {
                    cumulative += weights[i];
                    if (randomWeight < cumulative) {
                        return contents[i];
                    }
                }
            }
        }
        // Retourne un contenu de manière uniforme si aucune probabilité n'est définie.
        return contents[Math.floor(Math.random() * contents.length)];
    }

    /**
     * Renvoie la grille du terrain.
     *
     * @return {Case[][]} La grille de cases.
     */
    public getGrid(): Case[][] {
        return this.grid;
    }
}
