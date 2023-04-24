import { promisify } from "./helpers";
import parseCommand from "./parseCommand";
import parseInput, { delimiters } from "./parseInput";
import { IParsedCommand, IParserResult, IShellState } from "./types";

let parsed: IParserResult;
let cgen: Generator<IParsedCommand, void, unknown>;
let result: IteratorResult<IParsedCommand, void>;
let aliasMatch: string | undefined;
let tkn: string | null;

export const EXIT_FAILURE = 1,
    EXIT_SUCCESS = 0;

export default async function executeInput(
    s: IShellState,
    str = ""
): Promise<void> {
    s.history.push(str);
    parsed = parseInput(str);
    if (parsed.error) throw new Error(parsed.error);
    cgen = parseCommand(parsed.argv);
    while (EXIT_FAILURE) {
        result = cgen.next();
        if (!result.value || result.done) break;
        if (delimiters.includes(result.value.cmd)) {
            tkn = result.value.cmd;
            continue;
        }
        aliasMatch = s.alias.get(result.value.cmd);
        if (aliasMatch) {
            parsed = parseInput(aliasMatch);
            if (parsed.error) break;
            result.value.cmd = parsed.argv[0];
            result.value.argv.unshift(...parsed.argv.slice(1));
        }
        if (!s.bin.has(result.value.cmd)) {
            parsed.error = "'" + result.value.cmd + "' command not found\n";
            break;
        }
        if (tkn && new RegExp(`^[\\${delimiters[0]}]$`).test(tkn)) {
            if (s.process.exitCode === EXIT_FAILURE) break;
        }
        if (tkn && new RegExp(`^[\\${delimiters[1]}]$`).test(tkn)) {
            if (s.process.exitCode === EXIT_SUCCESS) break;
        }
        await promisify(s.bin.get(result.value.cmd)?.action)
            .call(undefined, Object.assign({}, s.process, result.value))
            .then((code: unknown) => {
                s.process.exitCode = code ? 1 : 0;
                tkn = null;
            })
            .catch((err) => (parsed.error = err));
        if (parsed.error) break;
    }
    if (parsed.error) throw new Error(parsed.error);
}
