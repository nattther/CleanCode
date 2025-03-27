import assert from "assert";
import { Guerrier } from "../Personnage/Guerrier";
import { FakeGuerrier } from "./FakeGuerrier";

export function testComparaisonGuerrier(): void {
    const nomValide = "Arthur";
    const guerrierReel = new Guerrier(nomValide);
    const guerrierFake = new FakeGuerrier(nomValide);
    
    assert.strictEqual(
        guerrierReel.nom.toString(),
        guerrierFake.nom.toString(),
        "Les noms doivent être identiques."
    );
    
    assert.deepStrictEqual(
        guerrierReel.stats,
        guerrierFake.stats,
        "Les statistiques doivent correspondre."
    );
    
    assert.deepStrictEqual(
        guerrierReel.inventaire,
        guerrierFake.inventaire,
        "Les inventaires doivent être identiques."
    );
    
    console.log("Test de comparaison Guerrier réussi.");
}

testComparaisonGuerrier();
