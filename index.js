var createPattern = function(path) {
  return {pattern: path, included: true, served: true, watched: false};
};

var curlPath = require('path').dirname(require.resolve('curl-amd')) + '/curl.js';

var initCurl = function(files) {
  files.unshift(createPattern(curlPath));
  files.unshift(createPattern(__dirname + '/adapter.js'));
};

initCurl.$inject = ['config.files'];

module.exports = {
  'framework:curl-amd': ['factory', initCurl]
};
