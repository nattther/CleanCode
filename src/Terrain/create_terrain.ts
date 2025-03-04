import { Terrain, TerrainConfig } from './terrain';

/**
 * Crée et retourne une instance de Terrain selon une configuration prédéfinie.
 * La probabilité d'un mur est désormais intégrée dans contentProbabilities.
 *
 * @returns {Terrain} Une instance de Terrain générée.
 */
export function createTerrain(): Terrain {
    const config: TerrainConfig = {
        rows: 6, // Nombre de lignes du terrain.
        cols: 6, // Nombre de colonnes du terrain.
        contentProbabilities: {
            Vide: 0.5,    // Probabilité qu'une case soit vide.
            Monstre: 0.1, // Probabilité qu'une case contienne un monstre.
            Tresor: 0.2,  // Probabilité qu'une case contienne un trésor.
            Mur: 0.2      // Probabilité qu'une case soit un mur (inaccessible).
        }
    };

    return new Terrain(config);
}
