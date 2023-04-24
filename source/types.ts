/**
 * Result from parsing string input to argv object
 */
export type IParserResult = {
    error: string | null;
    argv: string[];
};

/**
 * Command and arguments after parsing the input
 */
export type IParsedCommand = {
    cmd: string;
    argv: string[];
};

/**
 * Terminal Interface
 *  - Based on XTerminal (https://github.com/henryhale/xterminal)
 */
export interface ITerminal {
    write(...data: unknown[]): void;
    writeln(...data: unknown[]): void;
    clearHistory(): void;
    prompt(): void;
    clear(): void;
}

/**
 * Environment object
 */
export interface IEnv {
    username?: string;
    hostname?: string;
    ps1?: string;
}

/**
 * Standard Output interface
 */
export interface IStdOut {
    write(...args: unknown[]): void;
}

/**
 * State applied to executed command, more like `node:process` module
 */
export interface IProcess {
    exitCode: number;
    cmd: string | null;
    argv: string[];
    env: IEnv;
    stdout: IStdOut;
}

/**
 * Function invoked when a command is run
 */
export type ICommandAction = (process: IProcess) => void;

/**
 * Options for every command
 */
export type ICommandConfig = {
    desc: string;
    usage: string;
    action: ICommandAction;
};

/**
 * Config options for the shell
 */
export interface IShellState {
    term: ITerminal;
    history: string[];
    bin: Map<string, ICommandConfig>;
    alias: Map<string, string>;
    process: IProcess;
}

/**
 * Shell interface
 */
export interface IShell {
    execute(input: string): Promise<void>;
    addCommand(name: string, opt: ICommandConfig): void;
}
