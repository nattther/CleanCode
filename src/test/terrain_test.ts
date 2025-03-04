import assert from "assert";
import { Terrain, TerrainConfig } from "../Terrain/terrain";
import { CellContent } from "../Terrain/case";

/**
 * Teste que la grille créée a bien le nombre de lignes et de colonnes spécifié.
 */
function testTerrainDimensions(): void {
    const config: TerrainConfig = { rows: 6, cols: 6, wallProbability: 0.5 };
    const terrain = new Terrain(config);
    const grid = terrain.getGrid();
    assert.strictEqual(grid.length, 6, "Le nombre de lignes doit être 6.");
    grid.forEach((row, index) => {
        assert.strictEqual(row.length, 6, `Le nombre de colonnes de la ligne ${index} doit être 6.`);
    });
    console.log("Test des dimensions du terrain réussi.");
}

/**
 * Teste qu'un terrain vide (wallProbability = 0) n'a aucun mur sur aucune case.
 */
function testEmptyTerrain(): void {
    const config: TerrainConfig = { rows: 3, cols: 3, wallProbability: 0 };
    const terrain = new Terrain(config);
    const grid = terrain.getGrid();
    grid.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            assert.strictEqual(cell.blockedUp, false, `La case (${rowIndex}, ${colIndex}) ne doit pas avoir de mur en haut.`);
            assert.strictEqual(cell.blockedDown, false, `La case (${rowIndex}, ${colIndex}) ne doit pas avoir de mur en bas.`);
            assert.strictEqual(cell.blockedLeft, false, `La case (${rowIndex}, ${colIndex}) ne doit pas avoir de mur à gauche.`);
            assert.strictEqual(cell.blockedRight, false, `La case (${rowIndex}, ${colIndex}) ne doit pas avoir de mur à droite.`);
        });
    });
    console.log("Test du terrain vide (sans murs) réussi.");
}

/**
 * Teste qu'un terrain avec wallProbability = 1 a tous ses murs activés.
 */
function testFullyBlockedTerrain(): void {
    const config: TerrainConfig = { rows: 3, cols: 3, wallProbability: 1 };
    const terrain = new Terrain(config);
    const grid = terrain.getGrid();
    grid.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            assert.strictEqual(cell.blockedUp, true, `La case (${rowIndex}, ${colIndex}) doit avoir un mur en haut.`);
            assert.strictEqual(cell.blockedDown, true, `La case (${rowIndex}, ${colIndex}) doit avoir un mur en bas.`);
            assert.strictEqual(cell.blockedLeft, true, `La case (${rowIndex}, ${colIndex}) doit avoir un mur à gauche.`);
            assert.strictEqual(cell.blockedRight, true, `La case (${rowIndex}, ${colIndex}) doit avoir un mur à droite.`);
        });
    });
    console.log("Test du terrain avec murs partout réussi.");
}

/**
 * Vérifie que le contenu de chaque case appartient bien à l'énumération CellContent.
 */
function testValidCellContent(): void {
    const config: TerrainConfig = { rows: 3, cols: 3, wallProbability: 0.5 };
    const terrain = new Terrain(config);
    const grid = terrain.getGrid();
    const validContents = Object.values(CellContent);
    grid.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            assert.ok(validContents.includes(cell.content), `Le contenu de la case (${rowIndex}, ${colIndex}) doit être valide.`);
        });
    });
    console.log("Test du contenu des cases réussi.");
}

/**
 * Exécute tous les tests du terrain.
 */
function runTerrainTests(): void {
    testTerrainDimensions();
    testEmptyTerrain();
    testFullyBlockedTerrain();
    testValidCellContent();
    console.log("Tous les tests du terrain ont réussi.");
}

runTerrainTests();
