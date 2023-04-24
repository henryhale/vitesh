declare module "arrgv" {
    type ParseString = (str: string) => string[];
    const parser: ParseString;
    export default parser;
}
