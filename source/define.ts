import { IEnv } from "./types";

const defaultEnv: IEnv = {
    username: "user",
    hostname: window?.location?.hostname ?? "web",
    ps1: "> "
};

export function defineEnv(env: IEnv = {}): IEnv {
    return Object.assign({}, defaultEnv, env);
}
