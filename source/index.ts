import addDefaultCommands from "./builtin";
import { defineEnv } from "./define";
import executeInput, { EXIT_SUCCESS } from "./executor";
import { ICommandConfig, IEnv, IShell, IShellState, ITerminal } from "./types";

const instances = new WeakMap<IShell, IShellState>();

let shellState: IShellState | undefined;

function $(sh: IShell, callback: (s: IShellState) => void) {
    if ((shellState = instances.get(sh))) {
        callback(shellState);
    }
}

export default class Shell implements IShell {
    constructor(term: ITerminal, env: IEnv = {}) {
        instances.set(this, {
            term,
            history: [],
            bin: new Map(),
            alias: new Map(),
            process: {
                exitCode: EXIT_SUCCESS,
                cmd: null,
                argv: [],
                env: defineEnv(env),
                stdout: { write: term.write.bind(term) }
            }
        });
        $(this, (s) => addDefaultCommands(s));
    }
    addCommand(name: string, opt: ICommandConfig): void {
        if (
            !name ||
            typeof opt !== "object" ||
            !opt?.action ||
            !opt?.desc ||
            !opt?.usage
        ) {
            console.error("[viteshell] : addCommand arguments are invalid");
            return;
        }
        $(
            this,
            (s) => !s.bin.has(name) && s.bin.set(name, Object.assign({}, opt))
        );
    }
    async execute(input = ""): Promise<void> {
        $(this, async (s) => {
            try {
                await executeInput(s, input);
            } catch (error) {
                s.process.exitCode = 1;
                s.term.write("viteshell: " + error);
            } finally {
                $(this, (s) => s.term.write(s.process.env.ps1));
            }
        });
    }
}
