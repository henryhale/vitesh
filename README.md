<div align="center">
<h1>vitesh</h1>
<p>A minimal shell implementation for the web</p>
<img alt="GitHub Workflow Status" src="https://img.shields.io/github/actions/workflow/status/henryhale/vitesh/npm-publish.yml">
<img alt="npm" src="https://img.shields.io/npm/v/vitesh">
<img alt="GitHub release (latest SemVer)" src="https://img.shields.io/github/v/release/henryhale/vitesh">
<img alt="npm bundle size" src="https://img.shields.io/bundlephobia/minzip/vitesh">
<img alt="GitHub" src="https://img.shields.io/github/license/henryhale/vitesh">
</div>

## What is `vitesh`?

`vitesh` comes from [vite](https://en.wiktionary.org/wiki/vite), a French word for "quick" and [sh](https://en.wikipedia.org/wiki/Unix_shell), (or shell) a program that executes other programs in response to text commands.

`vitesh` is lightweight shell implementation written in TypeScript that tends to work just a like [bash](https://www.gnu.org/software/bash/). It is intended for use with [xterminal](https://github.com/henryhale/xterminal) but can as well be used elsewhere.

> **Note**: Currently, `vitesh` only provides a platform for adding and executing commands. Support for functionalities like input/output redirection, shell scripts, shell expansion and job control is not provided.  

## Key Features

- **Perfomant**: It is lightweight and really fast.
- **Functionality**: Chain commands (&&, ||), built-in commands (echo, help, ...), process object (env, argv, stdout, ...) and more.
- **Efficient Execution**: Commands are executed asynchronously (with promises).
- **TypeScript Support**: Type declaration files are provided for smooth development.

> `vitesh` provides a shell interface that allows you to add custom commands and also execute them programmatically.

## Installation

Install the module via [npm](https://npmjs.org/package/vitesh). Run the following command to add as a dependency.

```sh
npm install vitesh
```

Then import the package:

```js
import XTerminal from 'xterminal'
```

### Alternative Installation

You can install `vitesh` using any CDN that delivers packages from npm registry, for example: [unpkg](https://unpkg.com/vitesh/), [jsdelivr](https://cdn.jsdelivr.net/npm/vitesh/)

Using [unpkg](https://unpkg.com/vitesh/):

```html
<script type="text/javascript" src="https://unpkg.com/vitesh/dist/vitesh.js"></script>
```

Using [jsDelivr](https://cdn.jsdelivr.net/npm/vitesh/):

```html
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/vitesh/dist/vitesh.js"></script>
```

## API

The full public API for `vitesh` is contained within the TypeScript [declaration file](https://github.com/henryhale/vitesh/blob/master/types/vitesh.d.ts). It helps you understand the different interfaces required to setup your shell.

## Usage

To use `vitesh`, you need a terminal interface for inputting and outputting text.
[XTerminal](https://github.com/henryhale/xterminal) provides that interface, learn how to install `xterminal` [here](https://github.com/henryhale/xterminal#readme).

```html
<div id="app"></div>
```

```js
const term = new XTerminal();
term.mount('#app');

const shell = new Shell(term, {
    username: 'root',
    hostname: 'web',
    ps1: '$ '
});
```

### Custom commands

You can add custom commands like `hello`:

```js
...

shell.addCommand('hello', {
    desc: 'A command that greets the user',
    usage: 'hello [...name]',
    action(process) {
        const { argv, stdout } = process;
        if (argv.length) {
            stdout.write(`Hello ${argv.join(' ')}.\nIt is your time to shine.\n`);
        } else {
            stdout.write(`Opps!! I forgot your name.`);
        }
    }
});
```

### Command execution

You can also programmatically execute the commands;

```js
...

(async () => {
    await shell.execute('help');
});
```

### Command Chaining

Sometimes we need to run commands basing on the success or failure of the previously executed command or just normally.
For example;

- `echo "1" && echo "2"` : If the first command (`echo 1`) is succesfully, then `echo 2` will be executed.
- `echo "1" || echo "2"` : The second command (`echo 2`) will not be executed if the first was succesfull.
- `echo "1" ; echo "2"` : Both commands are executed irrespective of the success of the previously executed command.

## Browser Support

Generators, Promises, and some other latest ECMAScript features are used in the source code. 
Supporting a wide range of browsers is the goal. Modern browsers, most specifically the latest versions of Chrome, Firefox, Safari, and Edge (for desktop and mobile devices) are supported.

## License

Copyright (c) 2023 [Henry Hale](https://github.com/henryhale).

Released under the [MIT License](https://github.com/henryhale/vitesh/blob/master/LICENSE.txt).
