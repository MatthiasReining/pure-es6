//based on http://krasimirtsonev.com/blog/article/A-modern-JavaScript-router-in-100-lines-history-api-pushState-hash-url

var Router = {
    routes: [],
    mode: null,
    root: '/',
    config: function (options) {
        this.mode = options && options.mode && options.mode == 'history'
            && !!(history.pushState) ? 'history' : 'hash';
        this.root = options && options.root ? '/' + this.clearSlashes(options.root) + '/' : '/';
        return this;
    },
    getFragment: function () {
        var fragment = '';
        if (this.mode === 'history') {
            fragment = this.clearSlashes(decodeURI(location.pathname + location.search));
            fragment = fragment.replace(/\?(.*)$/, '');
            fragment = this.root != '/' ? fragment.replace(this.root, '') : fragment;
        } else {
            var match = window.location.href.match(/#(.*)$/);
            fragment = match ? match[1] : '';
        }
        return this.clearSlashes(fragment);
    },
    clearSlashes: function (path) {
        return path.toString().replace(/\/$/, '').replace(/^\//, '');
    },
    add: function (re, handler) {
        if (typeof re == 'function') {
            handler = re;
            re = '';
        }
        this.routes.push({ re: re, handler: handler });
        return this;
    },
    remove: function (param) {
        for (var i = 0, r; i < this.routes.length, r = this.routes[i]; i++) {
            if (r.handler === param || r.re.toString() === param.toString()) {
                this.routes.splice(i, 1);
                return this;
            }
        }
        return this;
    },
    flush: function () {
        this.routes = [];
        this.mode = null;
        this.root = '/';
        return this;
    },
    check: function (f) {
        var fragment = f || this.getFragment();
        for (var i = 0; i < this.routes.length; i++) {
            var match = fragment.match(this.routes[i].re);
            if (match) {
                match.shift();
                this.routes[i].handler.apply({}, match);
                return this;
            }
        }
        return this;
    },
    listen: function () {
        var self = this;
        var current = self.getFragment();
        var fn = function () {
            if (current !== self.getFragment()) {
                current = self.getFragment();
                self.check(current);
            }
        }
        clearInterval(this.interval);
        this.interval = setInterval(fn, 50);
        return this;
    },
    navigate: function (path) {
        path = path ? path : '';
        if (this.mode === 'history') {
            history.pushState(null, null, this.root + this.clearSlashes(path));
        } else {
            window.location.href = window.location.href.replace(/#(.*)$/, '') + '#' + path;
        }
        return this;
    }
}


/*
http://joakim.beng.se/blog/posts/a-javascript-router-in-20-lines.html
*/

// A hash to store our routes:
var routes = {};
//
function route(path, templateId, controller) {
    routes[path] = { templateId: templateId, controller: controller };
}
var el = null;
function router() {
    console.log('router executed');
    // Lazy load view element:
    el = el || document.getElementById('view');
    // Current route url (getting rid of '#' in hash as well):
    var url = location.hash.slice(1) || '/';
    // Get route by url:
    
    var route = routes[url];
    console.log('url: ' + url + " --> route: " + route);
    console.log(routes);
    // Do we have both a view and a route?
    //if (el && route.controller) {
    if (route.controller) {
        // Render route template with John Resig's template engine:
        //console.log('route -> ' + route.templateId);
        //el.innerHTML = document.getElementById(route.templateId).innerHTML;
        new route.controller();
    }
}