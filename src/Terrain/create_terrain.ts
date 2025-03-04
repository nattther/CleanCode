import { Terrain, TerrainConfig } from './terrain';

/**
 * Crée et retourne une instance de Terrain selon une configuration prédéfinie.
 *
 * @returns {Terrain} Une instance de Terrain générée.
 */
export function createTerrain(): Terrain {
    const config: TerrainConfig = {
        rows: 6,               // Nombre de lignes du terrain.
        cols: 6,               // Nombre de colonnes du terrain.
        wallProbability: 0.1,  // Probabilité d'avoir un mur sur un côté (10%).
        contentProbabilities: {
            'Vide': 0.5,
            'Monstre': 0.1,
            'Tresor': 0.2
        }
    };

    return new Terrain(config);
}
