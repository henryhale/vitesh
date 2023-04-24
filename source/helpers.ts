import { ICommandAction, IProcess } from "./types";

export function promisify(
    fn: ICommandAction | undefined
): (ctx: IProcess) => Promise<unknown> {
    return async function (ctx: IProcess) {
        if (typeof fn === "function") {
            return new Promise((res, rej) => {
                let result: unknown;
                try {
                    result = fn.call(undefined, ctx);
                } catch (error) {
                    rej(error as string);
                } finally {
                    res(result);
                }
            });
        } else {
            return Promise.reject(
                "something went wrong. command action maybe not defined."
            );
        }
    };
}
