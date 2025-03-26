import { CellContent } from "./case";

export class ContentSelector {
    private contentProbabilities?: { [key in CellContent]?: number };
    private randomFunc: () => number;

    constructor(
        contentProbabilities?: { [key in CellContent]?: number },
        randomFunc: () => number = Math.random
    ) {
        this.contentProbabilities = contentProbabilities;
        this.randomFunc = randomFunc;
    }

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
        return contents[Math.floor(this.randomFunc() * contents.length)];
    }
}
