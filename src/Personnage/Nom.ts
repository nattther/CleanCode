
export class Nom {
    private readonly value: string;

    /**
     * Crée une instance de Nom.
     * @param value Le nom du personnage.
     * @throws Error si le nom n'est pas valide (doit contenir entre 3 et 20 caractères).
     */
    constructor(value: string) {
        if (!Nom.isValid(value)) {
            throw new Error("Nom invalide : doit contenir entre 3 et 20 caractères.");
        }
        this.value = value;
    }

    /**
     * Vérifie si le nom fourni est valide.
     * @param value Le nom à valider.
     * @returns true si le nom est valide, sinon false.
     */
    public static isValid(value: string): boolean {
        return value.length >= 3 && value.length <= 20;
    }

    /**
     * Récupère la valeur du nom.
     * @returns La chaîne de caractères représentant le nom.
     */
    public getValue(): string {
        return this.value;
    }

    /**
     * Retourne une représentation textuelle du nom.
     * @returns Le nom en tant que chaîne de caractères.
     */
    public toString(): string {
        return this.value;
    }
}
