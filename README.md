# create-app-now

## Basic tools to build a web app

Boilerplate for building your app from scratch
With create-app-now you can build your site with simple template with no hassle:

1. Vanilla JavaScript
2. Vanilla TypeScript
3. React (based on [CRA](https://create-react-app.dev) eject)
4. Svelte (with prettier and prettier-plugin-svelte)
5. NodeJS and Express (with nodemon)
6. Deno and Oak (with Denon)

## Install

```bash
npm install -g create-app-now
```

## Usage

`create-app-now (project-directory-name)[-y | --yes][-g | --git][-i | --install]`

or

`can (project-directory-name)[-y | --yes][-g | --git][-i | --install]`

- project-directory-name: your project directory name. Default: _my-great-app_
- -y | --yes: skip prompts. Default: _false_
- -g | --git: initialize git. Default: _false_
- -i | --install: install node package automatically. Default: _null_
- -h | --help: show help instructions
- -v | --version: check create-app-now version

## Example

From your favourite terminal

```bash
can
cd my-great-app
code . // if you using VS Code
```

## Vanilla JavaScript / TypeScript Folder Structure

```
📂public
   🗒index.html
   🗒style.css
📂src
   🗒index.js | 🗒index.ts
🗒.gitignore
🗒package.json
🗒README.md
🗒LICENSE
```

## React Template Folder Structure

```
📂config
   📂jest
📂scripts
   🗒build.js
   🗒start.js
   🗒test.js
📂public
   🗒index.html
📂src
   🗒App.css
   🗒App.js
   🗒App.test.js
   🗒index.css
   🗒index.js
   🗒logo.svg
   🗒reportWebVitals.js
   🗒setupTest.js
🗒.gitignore
🗒LICENSE
🗒README.md
🗒package.json
```

## Svelte Template Folder Structure

This is the same with Svelte template

```
📂public
   🗒favicon.png
   🗒index.html
   🗒global.css
📂src
   🗒App.svelte
   🗒main.js
🗒.gitignore
🗒package.json
🗒README.md
🗒LICENSE
🗒rollup.config.js
```

## NodeJS and Deno Template Folder Structure

NodeJS template come with Express and Nodemon.
Deno template come with Oak and Denon.

```
📂public
   🗒index.html
   🗒style.css
   🗒index.js
🗒.gitignore
🗒package.json (only for NodeJS)
🗒denon.json (only for Deno)
🗒README.md
🗒LICENSE
```

## Include CSS custom reset

The CSS file include my custom reset. Feel free to clear it 😄.

## License

[MIT](https://github.com/padunk/create-app-now/blob/master/LICENSE)
