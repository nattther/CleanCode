import assert from "assert";
import { Terrain, TerrainConfig } from "../Terrain/terrain";
import { CellContent } from "../Terrain/case";

function testTerrainDimensions(): void {
    const config: TerrainConfig = { 
        rows: 6, 
        cols: 6,
        contentProbabilities: { 
            Vide: 0.5,
            Monstre: 0.1,
            Tresor: 0.2,
            Mur: 0.2,
        }
    };
    const terrain = new Terrain(config);
    const grid = terrain.getGrid();
    assert.strictEqual(grid.length, 6, "Le nombre de lignes doit être 6.");
    grid.forEach((row, index) => {
        assert.strictEqual(row.length, 6, `Le nombre de colonnes de la ligne ${index} doit être 6.`);
    });
    console.log("Test des dimensions du terrain réussi.");
}


function testEmptyTerrain(): void {
    const config: TerrainConfig = { 
        rows: 3, 
        cols: 3, 
        contentProbabilities: {
            Vide: 1,
            Monstre: 0,
            Tresor: 0,
            Mur: 0,
        }
    };
    const terrain = new Terrain(config);
    const grid = terrain.getGrid();
    grid.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            assert.strictEqual(cell.content, CellContent.Vide, `La case (${rowIndex}, ${colIndex}) doit être vide.`);
        });
    });
    console.log("Test du terrain vide (sans murs) réussi.");
}

function testFullyBlockedTerrain(): void {
    const config: TerrainConfig = { 
        rows: 3, 
        cols: 3, 
        contentProbabilities: {
            Vide: 0,
            Monstre: 0,
            Tresor: 0,
            Mur: 1,
        }
    };
    const terrain = new Terrain(config);
    const grid = terrain.getGrid();
    grid.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            assert.strictEqual(cell.content, CellContent.Mur, `La case (${rowIndex}, ${colIndex}) doit être un mur.`);
        });
    });
    console.log("Test du terrain avec murs partout réussi.");
}


function testValidCellContent(): void {
    const config: TerrainConfig = { 
        rows: 3, 
        cols: 3, 
        contentProbabilities: { 
            Vide: 0.5, 
            Monstre: 0.1, 
            Tresor: 0.2, 
            Mur: 0.2,
        }
    };
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


function runTerrainTests(): void {
    testTerrainDimensions();
    testEmptyTerrain();
    testFullyBlockedTerrain();
    testValidCellContent();
    console.log("Tous les tests du terrain ont réussi.");
}

runTerrainTests();
