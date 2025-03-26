import { Terrain, TerrainConfig } from './terrain';
import { CellContent } from './case';

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
