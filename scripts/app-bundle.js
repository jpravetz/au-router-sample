define('app',['exports', 'aurelia-framework', './root-routes'], function (exports, _aureliaFramework, _rootRoutes) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.App = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var logger = _aureliaFramework.LogManager.getLogger('app');

  var App = exports.App = (_dec = (0, _aureliaFramework.inject)(_rootRoutes.RootRoutes), _dec(_class = function () {
    function App(rootRoutes) {
      _classCallCheck(this, App);

      this.rootRoutes = rootRoutes;
      this.loaded = false;
      this.routeOptions = { viewPort: 'main' };
    }

    App.prototype.activate = function activate() {
      var _this = this;

      setTimeout(function () {
        _this.loaded = true;
      }, 1000);
    };

    App.prototype.configureRouter = function configureRouter(config, router) {
      this.router = router;
      config.title = 'Test Console';
      var routeConfig = this.rootRoutes.routes(this.routeOptions);
      config.map(routeConfig);
      logger.debug('Configured app routes', routeConfig.map(function (c) {
        return c.name;
      }));
    };

    App.prototype.navTo = function navTo(route) {
      return this.router ? this.router.navigateToRoute(route) : undefined;
    };

    return App;
  }()) || _class);
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('main',['exports', './environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('root-routes',['exports', './route-factory'], function (exports, _routeFactory) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.RootRoutes = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var RootRoutes = exports.RootRoutes = function (_RouteFactory) {
    _inherits(RootRoutes, _RouteFactory);

    function RootRoutes() {
      _classCallCheck(this, RootRoutes);

      return _possibleConstructorReturn(this, _RouteFactory.call(this));
    }

    _createClass(RootRoutes, [{
      key: 'routeData',
      get: function get() {
        return [{
          route: ['app', ''],
          name: 'app'
        }, {
          route: 'app-login',
          folder: 'app-login',
          name: 'login'
        }, {
          route: 'app-signup',
          folder: 'app-signup',
          name: 'signup'
        }];
      }
    }]);

    return RootRoutes;
  }(_routeFactory.RouteFactory);
});
define('route-factory',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var RouteFactory = exports.RouteFactory = function () {
    function RouteFactory() {
      _classCallCheck(this, RouteFactory);
    }

    RouteFactory.prototype.routes = function routes(options) {
      options = options || {};
      var rootFolder = options.folder ? './' + options.folder + '/' : './';
      var result = this.routeData.map(function (r) {
        var moduleId = rootFolder + (r.folder || r.name) + '/index';
        var auth = typeof options.auth === 'boolean' ? options.auth : r.auth;
        var nav = typeof options.nav === 'boolean' ? options.nav : r.nav;
        var route = options.routePath ? options.routePath + '/' + r.route : r.route;
        var href = r.href;
        if (!href && options.href === true) {
          href = typeof r.route === 'string' ? r.route : r.route[0];
        }
        var item = {
          route: route,
          name: r.name || r.route,
          title: r.title || r.route
        };
        if (auth !== undefined) {
          item.auth = auth;
        }
        if (nav !== undefined) {
          item.nav = nav;
        }
        if (href !== undefined) {
          item.href = href;
        }
        if (options.viewPort) {
          item.viewPorts = {};
          item.viewPorts[options.viewPort] = { moduleId: moduleId };
        } else {
          item.moduleId = moduleId;
        }
        return item;
      });
      return result;
    };

    _createClass(RouteFactory, [{
      key: 'routeData',
      get: function get() {
        return [];
      }
    }]);

    return RouteFactory;
  }();
});
define('app/app-routes',['exports', '../route-factory'], function (exports, _routeFactory) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.AppRoutes = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var AppRoutes = exports.AppRoutes = function (_RouteFactory) {
    _inherits(AppRoutes, _RouteFactory);

    function AppRoutes() {
      _classCallCheck(this, AppRoutes);

      return _possibleConstructorReturn(this, _RouteFactory.call(this));
    }

    _createClass(AppRoutes, [{
      key: 'routeData',
      get: function get() {
        return [{
          route: ['dashboard', ''],
          name: 'dashboard'
        }, {
          route: 'video'
        }, {
          route: 'profile'
        }];
      }
    }]);

    return AppRoutes;
  }(_routeFactory.RouteFactory);
});
define('app/index',['exports', 'aurelia-framework', './app-routes'], function (exports, _aureliaFramework, _appRoutes) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.App = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var _dec, _class;

  var logger = _aureliaFramework.LogManager.getLogger('app');

  var App = exports.App = (_dec = (0, _aureliaFramework.inject)(_appRoutes.AppRoutes), _dec(_class = function () {
    function App(appRoutes) {
      _classCallCheck(this, App);

      this.appRoutes = appRoutes;
      this.routeOptions = { viewPort: 'content' };
    }

    App.prototype.configureRouter = function configureRouter(config, router) {
      this.router = router;
      config.title = 'App Pages';
      var routeConfig = this.appRoutes.routes(this.routeOptions);
      config.map(routeConfig);
      logger.debug('Configured page routes', routeConfig.map(function (c) {
        return c.name;
      }));
      logger.debug('Configured page routes', this.router.navigation);
    };

    App.prototype.navTo = function navTo(routeName) {
      return this.router ? this.router.navigateToRoute(routeName) : undefined;
    };

    _createClass(App, [{
      key: 'routes',
      get: function get() {
        return routes;
      }
    }]);

    return App;
  }()) || _class);
});
define('app-login/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var AppLogin = exports.AppLogin = function AppLogin() {
    _classCallCheck(this, AppLogin);
  };
});
define('app-signup/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var AppLogin = exports.AppLogin = function AppLogin() {
    _classCallCheck(this, AppLogin);
  };
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('app/dashboard/index',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var DashboardPage = exports.DashboardPage = function DashboardPage() {
    _classCallCheck(this, DashboardPage);

    this.message = 'dashboard top';
  };
});
define('app/profile/index',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var DashboardPage = exports.DashboardPage = function DashboardPage() {
    _classCallCheck(this, DashboardPage);

    this.message = 'dashboard top';
  };
});
define('app/video/index',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var DashboardPage = exports.DashboardPage = function DashboardPage() {
    _classCallCheck(this, DashboardPage);

    this.message = 'dashboard top';
  };
});
define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"bootstrap/css/bootstrap.css\"></require>\n\n  <div class=\"container\" if.bind=\"!loaded || error\">\n    <div class=\"card-header\">\n      Featured\n    </div>\n    <div class=\"card-block\">\n      <h1 class=\"card-title\">${message}</h1>\n      <p if.bind=\"error\" class=\"card-text\">If this problem persists, try clearing your session</p>\n      <button type=\"button\" class=\"btn btn-primary btn-lg\" click.delegate=\"clearSession()\"\n              if.bind=\"error\"> Clear Session\n      </button>\n    </div>\n  </div>\n\n  <router-view name=\"main\" if.bind=\"loaded\"></router-view>\n\n</template>\n"; });
define('text!app/index.html', ['module'], function(module) { module.exports = "<template>\n  <!--<require from=\"./app-sidebar/index\"></require>-->\n  <!--<require from=\"./app-alerts/index\"></require>-->\n\n  <div class=\"container-fluid\">\n    <div class=\"row\">\n      <div class=\"col-lg-3 col-md-4\">\n        <div class=\"card\">\n          <div class=\"card-header\">\n            Sidebar\n          </div>\n          <div class=\"card-block\">\n            <h4 class=\"card-title\">Pages</h4>\n            <p class=\"card-text\">Sidebar routes</p>\n            <ul>\n              <li><a route-href=\"route: dashboard\">Dashboard</a></li>\n              <li><a route-href=\"route: video\">Video</a></li>\n              <li><a route-href=\"route: profile\">Profile</a></li>\n              <li><a route-href=\"route: login\">Login</a></li>\n            </ul>\n          </div>\n        </div>\n      </div>\n      <div class=\"col-lg-9 col-md-8\">\n        <div class=\"card\">\n          <div class=\"card-header\">\n            Content goes in card block below\n          </div>\n          <div class=\"card-block\">\n            <router-view name=\"content\"></router-view>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n\n</template>\n"; });
define('text!app-login/index.html', ['module'], function(module) { module.exports = "<template>\n\n  <div class=\"container-fluid\">\n    <div class=\"row\">\n      <div class=\"col-lg-4 col-md-5 offset-lg-3 offset-md-4\">\n        <div class=\"card\">\n          <div class=\"card-header\">\n            Logo here\n          </div>\n          <div class=\"card-block\">\n            <h4 class=\"card-title\">Login page</h4>\n            <p class=\"card-text\">Other pages</p>\n            <ul>\n              <li><a href=\"#\" click.trigger=\"navTo('#/app/dashboard')\">Dashboard</a></li>\n              <!--<li><a route-href=\"route: video\">Video</a></li>-->\n              <li><a route-href=\"route: app\">App Pages</a></li>\n              <li><a route-href=\"route: signup\">Signup</a></li>\n            </ul>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n\n</template>\n"; });
define('text!app-signup/index.html', ['module'], function(module) { module.exports = "<template>\n\n  <div class=\"container-fluid\">\n    <div class=\"row\">\n      <div class=\"col-lg-4 col-md-5 offset-lg-3 offset-md-4\">\n        <div class=\"card\">\n          <div class=\"card-header\">\n            Logo here\n          </div>\n          <div class=\"card-block\">\n            <h4 class=\"card-title\">Signup page</h4>\n            <p class=\"card-text\">Other pages</p>\n            <ul>\n              <li><a href=\"#\" click.trigger=\"navTo('#/app/dashboard')\">Dashboard</a></li>\n              <!--<li><a route-href=\"route: video\">Video</a></li>-->\n              <li><a route-href=\"route: app\">App Pages</a></li>\n              <li><a route-href=\"route: login\">Login</a></li>\n            </ul>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n\n</template>\n"; });
define('text!app/dashboard/index.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"card\">\n    <div class=\"card-block\">\n      <h1 class=\"card-title\">Dashboard</h1>\n      <p class=\"card-text\">${message}</p>\n      <a href=\"#\" class=\"btn btn-primary\">Maybe save changes</a>\n    </div>\n\n    <div class=\"card-block\">\n      <h2 class=\"card-title\">Links at this router level:</h2>\n      <ul class=\"list-group list-group-flush\">\n        <li repeat.for=\"row of router.navigation\" class=\"list-group-item\">\n          <a class=\"card-link\" href.bind=\"row.href\">${row.title}</a>\n        </li>\n      </ul>\n    </div>\n\n  </div>\n</template>\n"; });
define('text!app/profile/index.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"card\">\n    <div class=\"card-block\">\n      <h1 class=\"card-title\">Profile</h1>\n      <p class=\"card-text\">${message}</p>\n      <a href=\"#\" class=\"btn btn-primary\">Maybe save changes</a>\n    </div>\n  </div>\n</template>\n"; });
define('text!app/video/index.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"card\">\n    <div class=\"card-block\">\n      <h1 class=\"card-title\">Video</h1>\n      <p class=\"card-text\">${message}</p>\n      <a href=\"#\" class=\"btn btn-primary\">Maybe save changes</a>\n    </div>\n\n    <div class=\"card-block\">\n      <h2 class=\"card-title\">Links at this router level:</h2>\n      <ul class=\"list-group list-group-flush\">\n        <li repeat.for=\"row of router.navigation\" class=\"list-group-item\">\n          <a class=\"card-link\" href.bind=\"row.href\">${row.title}</a>\n        </li>\n      </ul>\n    </div>\n\n\n  </div>\n</template>\n"; });
//# sourceMappingURL=app-bundle.js.map