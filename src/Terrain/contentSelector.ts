import { CellContent } from "./case";

/**
 * Classe permettant de sélectionner un contenu de case en fonction des probabilités définies.
 */
export class ContentSelector {
    private contentProbabilities?: { [key in CellContent]?: number };
    private randomFunc: () => number;

    /**
     * Crée une instance de ContentSelector.
     *
     * @param contentProbabilities Objet définissant les probabilités pour chaque type de contenu.
     * @param randomFunc Fonction de génération de nombre aléatoire.
     */
    constructor(
        contentProbabilities?: { [key in CellContent]?: number },
        randomFunc: () => number = Math.random
    ) {
        this.contentProbabilities = contentProbabilities;
        this.randomFunc = randomFunc;
    }

    /**
     * Sélectionne un contenu parmi une liste en utilisant les probabilités définies.
     * Si aucune probabilité n'est définie ou si la somme des poids est nulle, la sélection se fait de manière uniforme.
     *
     * @param contents Liste des contenus possibles.
     * @return {CellContent} Le contenu sélectionné.
     */
    public pickContent(contents: CellContent[]): CellContent {
        if (this.contentProbabilities) {
            let totalWeight = 0;
            const weights = contents.map((content) => {
                const weight = this.contentProbabilities![content] ?? 0;
                totalWeight += weight;
                return weight;
            });
            if (totalWeight > 0) {
                const randomWeight = this.randomFunc() * totalWeight;
                let cumulative = 0;
                for (let i = 0; i < contents.length; i++) {
                    cumulative += weights[i];
                    if (randomWeight < cumulative) {
                        return contents[i];
                    }
                }
            }
        }
        // Sélection uniforme si aucune probabilité n'est définie.
        return contents[Math.floor(this.randomFunc() * contents.length)];
    }
}
