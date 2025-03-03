import assert from "assert";
import { Guerrier, Mage, Voleur } from "../Personnage/personnage";


function testValidCharacterCreation(): void {
    const nomValide = "Arthur";
    const personnage = new Guerrier(nomValide);
    

    assert.strictEqual(personnage.nom, nomValide, "Le nom doit être 'Arthur'");
    
    assert.strictEqual(personnage.stats.force, 10, "Force attendue: 10");
    assert.strictEqual(personnage.stats.defense, 8, "Défense attendue: 8");
    assert.strictEqual(personnage.stats.vitesse, 2, "Vitesse attendue: 2");
    assert.strictEqual(personnage.stats.sante, 12, "Santé attendue: 12");
    assert.strictEqual(personnage.stats.mana, 3, "Mana attendue: 3");
    

    assert.deepStrictEqual(personnage.inventaire, [], "L'inventaire doit être vide au départ");
    
    console.log("Test de création de personnage valide réussi.");
}


function testInvalidName(): void {
    // Test avec un nom trop court
    const nomCourt = "Al";
    try {
        new Mage(nomCourt);
        assert.fail("Le personnage avec un nom trop court aurait dû lancer une erreur.");
    } catch (error: any) {
        assert.strictEqual(error.message, "Nom invalide : doit contenir entre 3 et 20 caractères.", "Message d'erreur attendu pour un nom trop court.");
    }

    // Test avec un nom trop long
    const nomLong = "A".repeat(21); 
    try {
        new Voleur(nomLong);
        assert.fail("Le personnage avec un nom trop long aurait dû lancer une erreur.");
    } catch (error: any) {
        assert.strictEqual(error.message, "Nom invalide : doit contenir entre 3 et 20 caractères.", "Message d'erreur attendu pour un nom trop long.");
    }

    console.log("Test de validation du nom réussi.");
}


testValidCharacterCreation();
testInvalidName();
