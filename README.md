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

Make some configs:

```javascript
const mainConfig = {
  rootFolder : '.';
  sourceFolder : 'src';
  subFolder : 'main-site';
  buildsFolder : 'builds';
  bowerFolder : 'bower_components';
  docsFolder : 'docs';
  nodeFolder : 'node_modules';
  liveReload : false;
  debug : true;
  sourceFiles : {
    js: [],
    css: []
  }
};
const secondaryConfig = {
  rootFolder : '.';
  sourceFolder : 'src';
  subFolder : 'secondary-site';
  buildsFolder : 'builds';
  bowerFolder : 'different/bower_components';
  docsFolder : 'secondary-site-docs';
  nodeFolder : 'different/node_modules';
  liveReload : true;
  debug : false;
  sourceFiles : {
    js: [],
    css: []
  }
};
```

Then load the config you want

```
g$.loadConfig(mainConfig);
```

Now you can make calls:

```
g$.DS === '/'; // Directory separator from nPath
g$.root === '.';
g$.build === './builds/main-site/';
g$.source === './src/main-site/';
g$.bower === './bower_components/';
g$.node === './node_modules/';
g$.docs === './docs/';

```

Then load a different config

```
g$.loadConfig(secondaryConfig);
```

Now:

```
g$.DS === '/'; // Directory separator from nPath
g$.root === '.';
g$.build === './builds/secondary-site/';
g$.source === './src/secondary-site/';
g$.bower === './different/bower_components/';
g$.node === './different/node_modules/';
g$.docs === './secondary-site-docs/';

```

ex:
```
gulp.task('buildSetup', () => {
  g$.environment = 'dev';
  g$.buildInfo();
});


gulp.task('watch', () => {
  gulp.watch(g$.sourceFiles.js, ['js']);
});

gulp.task('docs', () => {

  g$.deleteFiles([
    g$.docs
  ]);

  gulp.src(g$.sourceFiles.docs)
    .pipe(esDoc({
      source: g$.source,
      destination: g$.docs,
      autoPrivate: true,
      includes: ['\\.(es6)$'],
      coverage: true,
      includeSource: true,
      plugins: [{name: 'esdoc-es7-plugin'}]
    }));
});

gulp.task('js', () => {

  g$.deleteFiles([g$.build + '**/**']);

  return gulp.src(g$.sourceFiles.js, {
      base: g$.source
    })
    .pipe(plumber())
    .pipe(gulpif(g$.environment === 'dev', sourcemaps.init()))
    .pipe(concat('main.js'))
    .pipe(gulpif(g$.environment === 'dev', sourcemaps.write()))
    .pipe(gulp.dest(g$.build));
});


```


## License

MIT
