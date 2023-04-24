/**
 * @author Henry Hale
 * @license MIT
 *
 * This contains the type declarations for the `vitesh` library.
 * This file declares the public API which is intended to be stable
 * and consumed by external programs.
 */

/// <reference lib="dom"/>

declare module "vitesh" {
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
     * Shell interface
     */
    export default class Shell {
        execute(input: string): Promise<void>;
        addCommand(name: string, opt: ICommandConfig): void;
    }
}
