"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_1 = __importDefault(require("readline"));
const create_terrain_1 = require("./Terrain/create_terrain");
const Joueur_1 = require("./Action_User/Joueur");
const menu_creation_personnage_1 = require("./Personnage/menu_creation_personnage");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // Génération du terrain
        const terrain = (0, create_terrain_1.createTerrain)();
        // Création du personnage
        const personnage = yield (0, menu_creation_personnage_1.lancerCreationPersonnage)();
        // Création du joueur avec le personnage et le terrain
        const joueur = new Joueur_1.Joueur(personnage, terrain);
        // Interface readline pour gérer les commandes de mouvement
        const rl = readline_1.default.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        console.log("\nBienvenue dans le jeu !");
        console.log("Commandes disponibles : N, S, E, O, A, G, D, Q (pour quitter)");
        rl.setPrompt("Entrez une commande : ");
        rl.prompt();
        rl.on("line", (line) => {
            const command = line.trim().toUpperCase();
            if (command === "Q") {
                console.log("Fin du jeu.");
                rl.close();
            }
            else {
                const result = joueur.processCommand(command);
                console.log(result);
                rl.prompt();
            }
        });
    });
}
main();
