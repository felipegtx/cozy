import { PathLike } from "fs";
import * as fs from "fs";

export class CozyFS { 
    readFile(path: PathLike | number, options: { encoding?: null; flag?: string; } | undefined | null, 
        callback: (err: NodeJS.ErrnoException, data: Buffer) => void): void { 
        fs.readFile(path, options, callback);
    }
}