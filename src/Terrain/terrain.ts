import { Case, CellContent } from "./case";
import { ContentSelector } from "./contentSelector";

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
 * Génère une grille de cases en choisissant aléatoirement leur contenu selon la distribution définie.
 */
export class Terrain {
    private grid: Case[][] = [];
    private rows: number;
    private cols: number;
    private contentSelector: ContentSelector;

    /**
     * Crée un nouveau terrain selon la configuration.
     *
     * @param config La configuration du terrain.
     */
    constructor(config: TerrainConfig) {
        this.rows = config.rows;
        this.cols = config.cols;
        this.validateConfig(config);
        this.contentSelector = new ContentSelector(config.contentProbabilities);
        this.buildGrid();
    }

    /**
     * Valide la configuration du terrain.
     * Vérifie que, si des probabilités sont définies, la somme des poids est supérieure à 0.
     *
     * @param config La configuration à valider.
     */
    private validateConfig(config: TerrainConfig): void {
        if (config.contentProbabilities) {
            const totalWeight = Object.values(config.contentProbabilities)
                .reduce((sum, weight) => sum + (weight ?? 0), 0);
            if (totalWeight <= 0) {
                throw new Error("La somme des probabilités doit être supérieure à 0.");
            }
        }
    }

    /**
     * Construit la grille de cases du terrain.
     * Chaque case est créée en choisissant son contenu grâce au ContentSelector.
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
     * Retourne aléatoirement un contenu parmi les valeurs de l'énumération CellContent.
     *
     * @return {CellContent} Le contenu sélectionné.
     */
    private getRandomContent(): CellContent {
        const contents: CellContent[] = [
            CellContent.Vide,
            CellContent.Monstre,
            CellContent.Tresor,
            CellContent.Mur
        ];
        return this.contentSelector.pickContent(contents);
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
