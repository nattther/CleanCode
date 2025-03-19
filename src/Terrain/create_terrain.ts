import { Terrain, TerrainConfig } from './terrain';
import { CellContent } from './case';

/**
 * Crée et retourne une instance de Terrain selon une configuration prédéfinie.
 * La probabilité d'un mur est désormais intégrée dans contentProbabilities.
 *
 * @returns {Terrain} Une instance de Terrain générée.
 */
export function createTerrain(): Terrain {
    const config: TerrainConfig = {
        rows: 6, 
        cols: 6, 
        contentProbabilities: {
            [CellContent.Vide]: 0.5,   
            [CellContent.Monstre]: 0.1, 
            [CellContent.Tresor]: 0.2,  
            [CellContent.Mur]: 0.2      
        }
    };

    return new Terrain(config);
}
