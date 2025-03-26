import { Case, CellContent } from "./case";
import { ContentSelector } from "./contentSelector";


export interface TerrainConfig {
    rows: number; 
    cols: number; 
    contentProbabilities?: { [key in CellContent]?: number }; 
}

export class Terrain {
    private grid: Case[][] = [];
    private rows: number;
    private cols: number;
    private contentSelector: ContentSelector;

    constructor(config: TerrainConfig) {
        this.rows = config.rows;
        this.cols = config.cols;
        this.validateConfig(config);
        this.contentSelector = new ContentSelector(config.contentProbabilities);
        this.buildGrid();
    }

    private validateConfig(config: TerrainConfig): void {
        if (config.contentProbabilities) {
            const totalWeight = Object.values(config.contentProbabilities)
                .reduce((sum, weight) => sum + (weight ?? 0), 0);
            if (totalWeight <= 0) {
                throw new Error("La somme des probabilités doit être supérieure à 0.");
            }
        }
    }

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

    private getRandomContent(): CellContent {
        const contents: CellContent[] = [
            CellContent.Vide,
            CellContent.Monstre,
            CellContent.Tresor,
            CellContent.Mur
        ];
        return this.contentSelector.pickContent(contents);
    }

    public getGrid(): Case[][] {
        return this.grid;
    }
}
