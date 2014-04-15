Adapter for the Curl AMD loader.
================================

Adapted from [karma-requirejs](https://github.com/karma-runner/karma-requirejs).
See [emscripten-treeviz](https://github.com/popham/emscripten-treeviz) for a project configured to use karma-curl-amd.

Analogous to [karma-requirejs](https://github.com/karma-runner/karma-requirejs), your `karma.conf.js` must include all of the files that need serving, e.g.
```
module.exports = function(config) {
config.set({
    ...
    frameworks: ['mocha', 'curl-amd'],
    files: [
        { pattern: 'node_modules/**/*.js', watched: false, included: false, served: true },
        { pattern: 'src/**/*.js', watched:true, included: false, served: true },
        'test-main.js'
    ],
    singleRun: false,
    autoWatch: true,
    ...
});
```

Again following [karma-requirejs](https://github.com/karma-runner/karma-requirejs), your `test-main.js` must normalize paths relative to Curl's configured `baseUrl`.
To use Karma's deep caching, watched packages should be configured similar to the `src` package:
```
var allTestFiles = [];
var TEST_REGEXP = /src(\/[^\/]*)*?\/test\/.*?\.js$/i;

var pathToModule = function(path) {
  return path.replace(/^\/base\//, '').replace(/\.js$/, '');
};

Object.keys(window.__karma__.files).forEach(function(file) {
  if (TEST_REGEXP.test(file)) {
    // Normalize paths to AMD paths.
    allTestFiles.push(pathToModule(file));
  }
});

curl.config({
    ...
    paths : {
        chai : 'node_modules/chai/chai'
    },
    packages : [
        ...
        {
            name : 'src',
            location : 'src/',
            config: { loader: 'karma-cache', 'lookup-prefix': '/' }
        },
        ...
    ],
    ...
});

curl(allTestFiles)
    .then(
        window.__karma__.start,
        function (ng) { throw new Error(ng.message); } );

```

Note in particular the `config` options on the `src` package.
The `karma-cache` loader mangles resources for lookups consistent with Karma's deep caching.
I'd like to move this to a conceptually cleaner API, but I don't have the energy to build exotic use cases for testing (yet).
For now you'll have to trudge through the source a little--I'd appreciate links to exotic use cases under the issue tracker for the forthcoming day of reckoning.
