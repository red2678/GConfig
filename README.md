# gConfig

![Build Status](https://img.shields.io/travis/red2678/gConfig.svg)
![Coverage](https://img.shields.io/coveralls/red2678/gConfig.svg)
![Downloads](https://img.shields.io/npm/dm/gConfig.svg)
![Downloads](https://img.shields.io/npm/dt/gConfig.svg)
![npm version](https://img.shields.io/npm/v/gConfig.svg)
![dependencies](https://img.shields.io/david/red2678/gConfig.svg)
![dev dependencies](https://img.shields.io/david/dev/red2678/gConfig.svg)
![License](https://img.shields.io/npm/l/gConfig.svg)

Configuration helper for Gulp

## Getting Started

This is a personal tool....it is most likely not going to be for you!

I also change it and break it a lot. Have a nice day.

Install it via npm:

```shell
npm install gconfig
```

And include in your project:

```javascript
import g$ from 'gconfig';
```

Make a config:

```javascript
const mainConfig = {};

// Config
mainConfig.rootFolder = '.';
mainConfig.sourceFolder = 'src';
mainConfig.subFolder = 'main-site';

mainConfig.buildsFolder = 'builds';

mainConfig.bowerFolder = 'bower_components';
mainConfig.docsFolder = 'docs';
mainConfig.nodeFolder = 'node_modules';

mainConfig.liveReload = false;
mainConfig.debug = true;

mainConfig.sourceFiles = {
  js: [],
  css: []
}
```

Then load config

```
g$.loadConfig(mainConfig).buildInfo();
```

Now you can make calls:

```
g$.build === './builds/main-site/'
g$.src === './src/main-site/'
```


## License

MIT
