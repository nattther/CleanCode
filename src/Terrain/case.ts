export enum CellContent {
    Vide = "Vide",  
    Monstre = "Monstre", 
    Tresor = "Tresor",   
    Mur = "Mur"          
}

export class Case {
    public content: CellContent;
    constructor(content: CellContent = CellContent.Vide) {
        this.content = content;
    }
}
