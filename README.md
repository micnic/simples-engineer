`simples-engineer` is a tool to connect incompatible template engines to simpleS servers and hosts.

#### Recommended for [simpleS 0.8+](https://www.npmjs.com/package/simples)

## Instalation

    npm install simples-engineer

## List of supported template engines

- [blade](https://www.npmjs.com/package/blade)
- [ejs 2.0+](https://www.npmjs.com/package/ejs)
- [hamljs](https://www.npmjs.com/package/hamljs)
- [jade](https://www.npmjs.com/package/jade)
- [swig](https://www.npmjs.com/package/swig)
- [twig](https://www.npmjs.com/package/twig)
- If the template engine is compatible with `Express` then `simples-engineer` will support it
- You can add support for your template engine with a pull request

## Usage

```js
var simples = require('simples'),
    engineer = require('simples-engineer');

var server = simples();

// For blade
var engine = engineer('blade', { /* engine options */ });

// For ejs
var engine = engineer('ejs', { /* engine options */ });

// For hamljs
var engine = engineer('hamljs', { /* engine options */ });

// For jade
var engine = engineer('jade', { /* engine options */ });

// For swig
var engine = engineer('swig', { /* engine options */ });

// For twig
var engine = engineer('twig', { /* engine options */ });

// For any other template engine which is compatible with Express
var engine = engineer('any-express-template-engine', { /* engine options */ });

// Connect the template engine to the server
server.engine(engine);
```

`simples-engineer` will require the template engine module, will check if they are supported and will apply a compatibility layer to them so they work well with `simpleS`'s insternal rendering sytem. Engine options are template engine specific options which can be applied on rendering. Note: the template engine module which you want to use with `simples-engineer` should be already installed.