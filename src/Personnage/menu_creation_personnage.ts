import readline from "readline";
import { Guerrier, Mage, Voleur, PersonnageConstructor } from "../Personnage/personnage";

export function lancerCreationPersonnage(): void {
    const classOptions: { [key: string]: { name: string; constructeur: PersonnageConstructor } } = {
        "1": { name: "Guerrier", constructeur: Guerrier },
        "2": { name: "Mage", constructeur: Mage },
        "3": { name: "Voleur", constructeur: Voleur },
    };

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    rl.question("Entrez le nom de votre personnage (3-20 caractères) : ", (nom: string) => {
        console.log("\nChoisissez la classe du personnage :");

        for (const key in classOptions) {
            if (Object.prototype.hasOwnProperty.call(classOptions, key)) {
                console.log(`${key}. ${classOptions[key].name}`);
            }
        }

        rl.question("Votre choix : ", (choix: string) => {
            let personnage;
            const option = classOptions[choix];
            if (option) {
                personnage = new option.constructeur(nom);
            } else {
                console.log("Choix invalide, création d'un Guerrier par défaut.");
                personnage = new Guerrier(nom);
            }

            console.log("\nPersonnage créé :");
            console.log(personnage.afficherInfos());
            rl.close();
        });
    });
}
