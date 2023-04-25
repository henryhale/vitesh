import parseInput from "./parseInput";
import { IShellState } from "./types";

export default function addDefaultCommands(s: IShellState): void {
    //clear
    s.bin.set("clear", {
        desc: "Clears entire terminal",
        usage: "clear",
        action() {
            s.term.clear();
        }
    });

    // alias
    s.bin.set("alias", {
        desc: "Define or display aliases",
        usage: "alias [name[=value] ... ]",
        action({ argv, stdout }) {
            if (!argv.length) {
                s.alias.forEach((v, k) => {
                    stdout.write("alias " + k + "='" + v + "'\n");
                });
                return;
            }
            argv.forEach((v) => {
                if (!v.includes("=")) return;
                const [key, val] = v.split("=");
                const t = parseInput(val);
                if (key && !t.error && s.bin.has(t.argv[0])) {
                    s.alias.set(key, val);
                }
            });
        }
    });

    // echo
    s.bin.set("echo", {
        desc: "Write arguments to the standard output with a single space separation, followed by a newline",
        usage: "echo [args...]",
        action({ argv, stdout }) {
            if (argv.length) {
                argv.forEach((v) => stdout.write(v));
            }
            stdout.write("\n");
        }
    });

    // history
    s.bin.set("history", {
        desc: "Display or manipulate the history list.",
        usage: "history [-c] [-n]",
        action({ argv, stdout }) {
            if (argv.includes("-c")) {
                s.term.clearHistory();
                s.history.splice(0);
                stdout.write("History was cleared.\n");
            } else if (argv.includes("-n")) {
                stdout.write("History: " + s.history.length + " entries.\n");
            } else {
                s.history.forEach((v, i) => {
                    stdout.write("\n" + (i + 1) + "\t" + v);
                });
                stdout.write("\n");
            }
        }
    });

    //help
    s.bin.set("help", {
        desc: "Display information about commands",
        usage: "help [name]",
        action({ argv, stdout }) {
            if (!argv.length) {
                stdout.write(
                    "vitesh: version __VERSION__ \nType `help` to see this list."
                );
                stdout.write(
                    "\nType `help name` to find out more about the command `name`.\n"
                );
                Array.from(s.bin.keys()).forEach((c) => {
                    stdout.write("\n" + s.bin.get(c)?.usage);
                });
            } else {
                const c = s.bin.get(argv[0]);
                if (c) {
                    stdout.write("\n" + argv[0] + "\n" + c.usage + "\n" + c.desc);
                }
            }
            stdout.write("\n");
        }
    });
}
