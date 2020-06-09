# create-app-now 1.1.0

## Basic tools to build a web app

With create-app-now you can build your site with simple template with no hassle:

1. Vanilla JavaScript
2. Vanilla TypeScript
3. React (with Webpack)
4. Svelte
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
📂dist
📂public
   🗒index.html
📂src
   🗒App.css
   🗒App.js
   🗒index.js
🗒.babelrc
🗒.gitignore
🗒package.json
🗒README.md
🗒LICENSE
🗒webpack.config.js
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
