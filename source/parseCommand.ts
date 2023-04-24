import { delimiters } from "./parseInput";
import { IParsedCommand } from "./types";

export default function* parseCommand(
    argv: string[]
): Generator<IParsedCommand, void, unknown> {
    const tmp: string[] = [];
    let isDelimiter = false;
    let i = 0;
    while (i < argv.length) {
        tmp.splice(0);
        if (isDelimiter) {
            isDelimiter = false;
            tmp.push(argv[i++]);
        } else {
            do {
                if (delimiters.includes(argv[i])) {
                    isDelimiter = true;
                    break;
                }
                tmp.push(argv[i++]);
            } while (i < argv.length);
        }
        yield {
            cmd: tmp[0] || "",
            argv: tmp.slice(1)
        };
    }
}
