import { PathLike } from 'fs';
import * as fs from "promise-fs";

export class CozyFS {
    readFile(path: PathLike | number, options: { encoding?: null; flag?: string; } | undefined | null):
        Promise<Buffer> {
        return fs.readFile(path);
    }
}