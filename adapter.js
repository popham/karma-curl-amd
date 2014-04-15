(function(karma) {
    // Let `test-main.js` take care of determining when resources are available.
    karma.loaded = function() {};

    function createConfig(karma) {
        // Default
        var config = {
            baseUrl: "base/",
            paths: {
                curl: 'node_modules/curl-amd/src/curl',
                'karma-cache': 'node_modules/karma-curl-amd/caching-plugin'
            }
        };

        if (!karma.config || !karma.config.curl) {
            return config;
        }

        var update = karma.config.curl;

        for (var key in update) {
            if (key === 'paths') {
                // Merge path data.
                for (var name in update.paths) {
                    config.paths[name] = update.paths[name];
                }
            } else {
                config[key] = update[key];
            }
        }

        return config;
    }

    // This adapter loads prior to the Curl, so at load time Curl will take on
    // this configuration.
    window.curl = createConfig(karma);
})(window.__karma__);
