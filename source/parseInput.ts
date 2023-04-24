import arrgv from "arrgv";
import { IParserResult } from "./types";

export const delimiters = ["&&", "||", ";", "|", "&"];

export default function parseInput(str: string): IParserResult {
    const result: IParserResult = {
        error: null,
        argv: []
    };
    let c = "";
    try {
        if (
            delimiters.some(
                (v) => str.startsWith((c = v)) || str.endsWith((c = v))
            )
        ) {
            throw new SyntaxError(
                "syntax error near unexpected token `" + c + ""
            );
        }
        result.argv = arrgv(str);
    } catch (error) {
        result.error = error as string;
    }
    return result;
}
