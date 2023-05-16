import addDefaultCommands from "./builtin";
import { defineEnv } from "./define";
import executeInput, { EXIT_FAILURE, EXIT_SUCCESS } from "./executor";
import { mustache } from "./helpers";
import { ICommandConfig, IEnv, IShell, IShellState, ITerminal } from "./types";

const instances = new WeakMap<IShell, IShellState>();

let shellState: IShellState | undefined;

function $(sh: IShell, callback: (s: IShellState) => void) {
    if ((shellState = instances.get(sh))) {
        callback(shellState);
    }
}

function terminalPrompt(s: IShellState) {
    s.term.write(
        mustache(`[{{username}}@{{hostname}}] {{ps1}} `, s.process.env)
    );
    s.term.prompt();
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
    public init(greeting = ""): void {
        $(this, (s) => {
            if (greeting) s.term.write(greeting);
            terminalPrompt(s);
        });
    }
    public addCommand(name: string, opt: ICommandConfig): boolean {
        let status = false;
        if (
            !name ||
            typeof opt !== "object" ||
            !opt?.action ||
            !opt?.desc ||
            !opt?.usage
        ) {
            console.error("[vitesh] : addCommand arguments are invalid");
        } else {
            $(this, (s) => {
                if (!s.bin.has(name)) {
                    s.bin.set(
                        name,
                        Object.assign(
                            {
                                desc: null,
                                usage: null,
                                action: null
                            },
                            opt
                        )
                    );
                    status = true;
                }
            });
        }
        return status;
    }
    public removeCommand(name: string): boolean {
        let status = false;
        $(this, (s) => {
            if (s.bin.has(name)) {
                s.bin.delete(name);
                status = true;
            }
        });
        return status;
    }
    public async execute(input = ""): Promise<void> {
        $(this, async (s) => {
            try {
                if (input) {
                    s.history.push(input);
                    await executeInput(s, input);
                }
            } catch (error) {
                s.process.exitCode = EXIT_FAILURE;
                s.term.write("vitesh: " + error);
            } finally {
                terminalPrompt(s);
            }
        });
    }
}
