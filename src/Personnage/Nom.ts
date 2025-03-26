
export class Nom {
    private readonly value: string;

    constructor(value: string) {
        if (!Nom.isValid(value)) {
            throw new Error("Nom invalide : doit contenir entre 3 et 20 caractères.");
        }
        this.value = value;
    }

    public static isValid(value: string): boolean {
        return value.length >= 3 && value.length <= 20;
    }

    public getValue(): string {
        return this.value;
    }

    public toString(): string {
        return this.value;
    }
}
