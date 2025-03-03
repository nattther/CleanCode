import assert from "assert";
import { Guerrier, Mage, Voleur } from "../Personnage/personnage";

/**
 * Teste la création d'un Guerrier avec un nom valide.
 */
function testValidCharacterCreationGuerrier(): void {
    const nomValide = "Arthur";
    const guerrier = new Guerrier(nomValide);
    
    // Vérification du nom.
    assert.strictEqual(guerrier.nom, nomValide, "Le nom doit être 'Arthur'");
    
    // Vérification des statistiques initiales du Guerrier.
    assert.strictEqual(guerrier.stats.force, 15, "Force attendue: 15");
    assert.strictEqual(guerrier.stats.intelligence, 5, "Intelligence attendue: 5");
    assert.strictEqual(guerrier.stats.defense, 12, "Défense attendue: 12");
    assert.strictEqual(guerrier.stats.resistanceMagique, 6, "Résistance magique attendue: 6");
    assert.strictEqual(guerrier.stats.vitesse, 8, "Vitesse attendue: 8");
    assert.strictEqual(guerrier.stats.chance, 5, "Chance attendue: 5");
    assert.strictEqual(guerrier.stats.endurance, 10, "Endurance attendue: 10");
    assert.strictEqual(guerrier.stats.esprit, 4, "Esprit attendu: 4");
    assert.strictEqual(guerrier.stats.sante, 150, "Santé attendue: 150");
    assert.strictEqual(guerrier.stats.mana, 50, "Mana attendue: 50");
    
    // Vérification de l'inventaire (doit être vide).
    assert.deepStrictEqual(guerrier.inventaire, [], "L'inventaire doit être vide au départ");
    
    console.log("Test de création de Guerrier valide réussi.");
}

/**
 * Teste la validation du nom pour les personnages.
 */
function testInvalidName(): void {
    // Test avec un nom trop court.
    try {
        new Mage("Al");
        assert.fail("Un Mage avec un nom trop court aurait dû lancer une erreur.");
    } catch (error: any) {
        assert.strictEqual(
            error.message,
            "Nom invalide : doit contenir entre 3 et 20 caractères.",
            "Message d'erreur attendu pour un nom trop court."
        );
    }
    
    // Test avec un nom trop long.
    const nomLong = "A".repeat(21);
    try {
        new Voleur(nomLong);
        assert.fail("Un Voleur avec un nom trop long aurait dû lancer une erreur.");
    } catch (error: any) {
        assert.strictEqual(
            error.message,
            "Nom invalide : doit contenir entre 3 et 20 caractères.",
            "Message d'erreur attendu pour un nom trop long."
        );
    }
    
    console.log("Test de validation des noms invalides réussi.");
}

// Exécution des tests.
testValidCharacterCreationGuerrier();
testInvalidName();
