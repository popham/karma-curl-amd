(function (karma, pathname) {
    define({
        load: function (name, req, load, config) {
            var IS_DEBUG = /debug\.html$/.test(pathname);
            var prefix = 'lookup-prefix' in config ? config['lookup-prefix'] : '';

            name = prefix + req.toUrl(name);
            // Name without extension gets a .js appended
            if (name.lastIndexOf('.') <= name.lastIndexOf('/') + 1) {
                name = name + '.js';
            }

            if (karma.files.hasOwnProperty(name)) {
                if (!IS_DEBUG) {
                    name = name + '?' + karma.files[name];
                }
            } else {
                console.error('There is no timestamp for ' + name + '!');
            }

            req([name], function (module) {
                load(module);
            });
        }
    });
})(window.__karma__, window.location.pathname);
