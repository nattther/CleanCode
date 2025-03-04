import { Case, CellContent } from "./case";

/**
 * Interface de configuration pour le terrain.
 */
export interface TerrainConfig {
  rows: number; // Nombre de lignes du terrain.
  cols: number; // Nombre de colonnes du terrain.
  wallProbability?: number; // Probabilité d'avoir un mur sur un côté (par défaut : 0.5).
  contentProbabilities?: { [key in CellContent]?: number }; // Probabilités pour chaque contenu.
}

/**
 * Classe représentant le terrain.
 * Génère une grille de cases selon la configuration fournie.
 */
export class Terrain {
  private grid: Case[][];
  private rows: number;
  private cols: number;
  private wallProbability: number;
  private contentProbabilities?: { [key in CellContent]?: number };

  /**
   * Crée un nouveau terrain selon la configuration.
   *
   * @param config La configuration du terrain.
   */
  constructor(config: TerrainConfig) {
    this.rows = config.rows;
    this.cols = config.cols;
    this.wallProbability = config.wallProbability ?? 0.5;
    this.contentProbabilities = config.contentProbabilities;
    this.grid = [];
    this.buildGrid();
  }

  /**
   * Construit la grille de cases du terrain.
   */
  private buildGrid(): void {
    for (let row = 0; row < this.rows; row++) {
      const rowArray: Case[] = [];
      for (let col = 0; col < this.cols; col++) {
        const cellContent = this.getRandomContent();
        
        // Pour les murs, on tient compte des cases déjà créées.
        let blockedUp: boolean;
        let blockedLeft: boolean;
        
        // Si ce n'est pas la première ligne, on hérite du mur bas de la case au-dessus.
        if (row > 0) {
          blockedUp = this.grid[row - 1][col].blockedDown;
        } else {
          blockedUp = Math.random() < this.wallProbability;
        }
        
        // Si ce n'est pas la première colonne, on hérite du mur droit de la case à gauche.
        if (col > 0) {
          blockedLeft = rowArray[col - 1].blockedRight;
        } else {
          blockedLeft = Math.random() < this.wallProbability;
        }
        
        // Pour les murs droit et bas, on génère aléatoirement.
        const blockedRight = Math.random() < this.wallProbability;
        const blockedDown = Math.random() < this.wallProbability;
        
        rowArray.push(new Case(cellContent, blockedUp, blockedDown, blockedLeft, blockedRight));
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
    ];
    return this.pickContent(contents);
  }

  /**
   * Sélectionne un contenu à partir d'une liste en utilisant les probabilités définies.
   * Si aucune probabilité n'est définie ou si la somme des poids est nulle,
   * la sélection se fait de manière uniforme.
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
    // Retourne un contenu de manière uniforme si aucune probabilité n'est définie ou si la somme est nulle.
    return contents[Math.floor(Math.random() * contents.length)];
  }

  /**
   * Initialise aléatoirement les murs d'une case en fonction de la probabilité définie.
   *
   * @return {Object} Un objet indiquant si chaque mur est présent (true si présent).
   */
  private getRandomWalls(): {
    blockedUp: boolean;
    blockedDown: boolean;
    blockedLeft: boolean;
    blockedRight: boolean;
  } {
    return {
      blockedUp: Math.random() < this.wallProbability,
      blockedDown: Math.random() < this.wallProbability,
      blockedLeft: Math.random() < this.wallProbability,
      blockedRight: Math.random() < this.wallProbability,
    };
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
