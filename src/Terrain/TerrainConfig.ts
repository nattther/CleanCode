import { CellContent } from "./case";



export interface TerrainConfig {
    rows: number;
    cols: number;
    contentProbabilities?: {
        [key in CellContent]?: number;
    };
}
