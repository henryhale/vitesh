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

`vitesh` comes from [Vite](https://en.wiktionary.org/wiki/vite), a French word for "quick" and [sh](https://en.wikipedia.org/wiki/Unix_shell), (or shell) a program that executes other programs in response to text commands.

`vitesh` is lightweight shell implementation written in TypeScript that tends to work just a like [bash](https://www.gnu.org/software/bash/). It is intended for use with [xterminal](https://github.com/henryhale/xterminal) but can as well be used elsewhere.

> **Note**: Currently, `vitesh` only provides a platform for adding and executing commands. Support for functionalities like input/output redirection, shell scripts, shell expansion and job control is not provided.  

## Key Features

- **Perfomant**: It is lightweight and really fast.
- **Functionality**: Chain commands (&&, ||), built-in commands (echo, help, ...), process object (env, argv, stdout, ...) and more.
- **Efficient Execution**: Commands are executed asynchronously (with promises).
- **TypeScript Support**: Type declaration files are provided for smooth development.

> `vitesh` provides a shell interface that allows you to add custom commands and also execute them programmatically.

## Getting Started

Install the module via [NPM](https://npmjs.org/package/vitesh). Run the following command to add  as a dependency.

```sh
npm install vitesh
```

## API

The full API for `vitesh` is contained within the TypeScript [declaration file](https://github.com/henryhale/vitesh/blob/master/types/vitesh.d.ts).

## Browser Support

Generators, Promises, and some other latest ECMAScript features are used in the source code. 
Supporting a wide range of browsers is the goal. Modern browsers, most specifically the latest versions of Chrome, Firefox, Safari, and Edge (for desktop and mobile devices) are supported.

## License

Copyright (c) 2023 [Henry Hale](https://github.com/henryhale).

Released under the [MIT License](https://github.com/henryhale/vitesh/blob/master/LICENSE.txt).
