/// <reference types="node" />
import { PathLike } from "fs";
export declare class CozyFS {
    readFile(path: PathLike | number, options: {
        encoding?: null;
        flag?: string;
    } | undefined | null, callback: (err: NodeJS.ErrnoException, data: Buffer) => void): void;
}
