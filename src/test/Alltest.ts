import { runCombatAcceptanceTests } from "./combat_test";
import { runAcceptanceTests } from "./deplacement_test";
import { runTerrainTests } from "./terrain_test";
import { testComparaisonGuerrier } from "./test_personnage";

runCombatAcceptanceTests();
runAcceptanceTests();
runTerrainTests();
testComparaisonGuerrier();
