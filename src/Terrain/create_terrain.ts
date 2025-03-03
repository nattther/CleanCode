import { Terrain, TerrainConfig } from './terrain';

/**
 * Crée et retourne une instance de Terrain selon une configuration prédéfinie.
 *
 * @returns {Terrain} Une instance de Terrain générée.
 */
export function createTerrain(): Terrain {
    // Définition de la configuration du terrain.
    const config: TerrainConfig = {
        rows: 6,               // Nombre de lignes du terrain.
        cols: 6,               // Nombre de colonnes du terrain.
        wallProbability: 0.3,  // Probabilité d'avoir un mur sur un côté (30%).
        contentProbabilities: {
            // Définition de la distribution des contenus.
            // Ici, le terrain aura 50% de chance d'être Vide,
            // 30% de chance de contenir un Monstre,
            // et 20% de chance de contenir un Tresor.
            'Vide': 0.5,
            'Monstre': 0.3,
            'Tresor': 0.2
        }
    };

    // Création et retour du terrain généré selon la configuration.
    return new Terrain(config);
}
