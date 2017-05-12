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

  var logger = _aureliaFramework.LogManager.getLogger('app.root');

  var App = exports.App = (_dec = (0, _aureliaFramework.inject)(_rootRoutes.RootRoutes), _dec(_class = function () {
    function App(rootRoutes) {
      _classCallCheck(this, App);

      this.rootRoutes = rootRoutes;
      this.message = 'Loading...';
      this.loaded = false;
      this.routeOptions = { viewPort: 'main' };
      logger.debug('constructor');
    }

    App.prototype.activate = function activate() {
      var _this = this;

      logger.debug('activate...');
      setTimeout(function () {
        logger.debug('activated');
        _this.loaded = true;
        _this.message = 'Loaded';
      }, 1000);
    };

    App.prototype.attached = function attached() {
      logger.debug('attached');
    };

    App.prototype.configureRouter = function configureRouter(config, router) {
      this.router = router;
      config.title = 'Test Console';
      var routeConfig = this.rootRoutes.routes(this.routeOptions);
      config.map(routeConfig);
      logger.debug('Configured root routes', routeConfig.map(function (c) {
        return c.name;
      }));
      logger.debug('Configured root routes', this.router.navigation);
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

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

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
        var moduleId = rootFolder + (r.folder || r.name || r.route) + '/index';
        var auth = getValue('boolean', options.auth, r.auth, false);
        var nav = getValue('boolean', options.nav, r.nav, true);
        var route = options.routePath ? options.routePath + '/' + r.route : r.route;
        var href = r.href;
        if (!href && options.href === true) {
          href = typeof r.route === 'string' ? r.route : r.route[0];
        }
        var item = {
          route: route,
          name: r.name || r.route,
          title: r.title || r.route,
          auth: auth,
          nav: nav
        };
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

  function getValue(type) {
    var args = Array.prototype.slice.call(arguments, 1);
    for (var adx = 0; adx < args.length; adx++) {
      if (_typeof(args[adx]) === type) {
        return args[adx];
      }
    }
  }
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

  var logger = _aureliaFramework.LogManager.getLogger('app.app');

  var App = exports.App = (_dec = (0, _aureliaFramework.inject)(_appRoutes.AppRoutes), _dec(_class = function () {
    function App(appRoutes) {
      _classCallCheck(this, App);

      this.appRoutes = appRoutes;
      this.routeOptions = { viewPort: 'content' };
      logger.debug('constructor');
    }

    App.prototype.activate = function activate() {
      logger.debug('activate...');
      setTimeout(function () {
        logger.debug('activated');
      }, 500);
    };

    App.prototype.attached = function attached() {
      logger.debug('attached');
    };

    App.prototype.configureRouter = function configureRouter(config, router) {
      this.router = router;
      config.title = 'App Pages';
      var routeConfig = this.appRoutes.routes(this.routeOptions);
      config.map(routeConfig);
      logger.debug('Configured app routes', routeConfig.map(function (c) {
        return c.name;
      }));
      logger.debug('Configured app routes', this.router.navigation);
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
define('app-signup/index',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.AppLogin = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var logger = _aureliaFramework.LogManager.getLogger('app.signup');

  var AppLogin = exports.AppLogin = function AppLogin() {
    _classCallCheck(this, AppLogin);

    logger.debug('constructor');
  };
});
define('app-login/index',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.AppLogin = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var logger = _aureliaFramework.LogManager.getLogger('app.login');

  var AppLogin = exports.AppLogin = function AppLogin() {
    _classCallCheck(this, AppLogin);

    logger.debug('constructor');
  };
});
define('resources/index',['exports', './value-converters/index', './elements/index'], function (exports, _index, _index3) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _index2 = _interopRequireDefault(_index);

  var _index4 = _interopRequireDefault(_index3);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var resources = {
    converters: _index2.default.map(function (name) {
      return './value-converters/' + name;
    }),
    elements: _index4.default.map(function (name) {
      return './elements/' + name;
    })
  };

  var allResources = Object.values(resources).reduce(function (all, res) {
    return all.concat(res);
  }, []);

  function configure(aurelia) {
    aurelia.globalResources(allResources);
  }
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

  var Profile = exports.Profile = function Profile() {
    _classCallCheck(this, Profile);

    this.message = 'dashboard top';
  };
});
define('app/video/index',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.VideoPage = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var logger = _aureliaFramework.LogManager.getLogger('app.video');

  var VideoPage = exports.VideoPage = function VideoPage() {
    _classCallCheck(this, VideoPage);

    logger.debug('constructor');
  };
});
define('resources/elements/index',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = ['router-nav.html'];
});
define('resources/value-converters/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = [];
});
define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"bootstrap/css/bootstrap.css\"></require>\n\n  <div class=\"container\" if.bind=\"!loaded || error\">\n    <div class=\"card-block\">\n      <h1 class=\"card-title\">${message}</h1>\n      <p if.bind=\"error\" class=\"card-text\">If this problem persists, try clearing your session</p>\n      <button type=\"button\" class=\"btn btn-primary btn-lg\" click.delegate=\"clearSession()\"\n              if.bind=\"error\"> Clear Session\n      </button>\n    </div>\n  </div>\n\n  <router-view name=\"main\" if.bind=\"loaded\"></router-view>\n\n</template>\n"; });
define('text!app/index.html', ['module'], function(module) { module.exports = "<template>\n  <!--<require from=\"./app-sidebar/index\"></require>-->\n  <!--<require from=\"./app-alerts/index\"></require>-->\n\n  <div class=\"container-fluid\">\n    <div class=\"row\">\n      <div class=\"col-lg-3 col-md-4\">\n        <div class=\"card\">\n          <div class=\"card-header\">\n            Sidebar (app/index.html)\n          </div>\n          <div class=\"card-block\">\n            <h2>Routes</h2>\n            <ul class=\"list-group list-group-flush\">\n              <li class=\"list-group-item\"><a class=\"card-link\" route-href=\"route: dashboard\">route-href=\"route:\n                dashboard\"</a></li>\n              <li class=\"list-group-item\"><a class=\"card-link\" route-href=\"route: video\">route-href=\"route: video\"</a>\n              </li>\n              <li class=\"list-group-item\"><a class=\"card-link\" route-href=\"route: profile\">route-href=\"route:\n                profile\"</a></li>\n              <li class=\"list-group-item\"><a class=\"card-link\" route-href=\"route: login\">route-href=\"route: login\"</a>\n              </li>\n              <li class=\"list-group-item\"><a class=\"card-link\" route-href=\"route: signup\">route-href=\"route: signup\"</a>\n              </li>\n            </ul>\n          </div>\n          <router-nav router.bind=\"router\"></router-nav>\n        </div>\n      </div>\n      <div class=\"col-lg-9 col-md-8\">\n        <div class=\"card\">\n          <div class=\"card-header\">\n            Content goes in card block below\n          </div>\n          <div class=\"card-block\">\n            <router-view name=\"content\"></router-view>\n          </div>\n        </div>\n\n      </div>\n    </div>\n  </div>\n\n</template>\n"; });
define('text!app-login/index.html', ['module'], function(module) { module.exports = "<template>\n\n  <div class=\"container-fluid\">\n    <div class=\"row\">\n      <div class=\"col-lg-4 col-md-5 offset-lg-3 offset-md-4\">\n        <div class=\"card\">\n          <div class=\"card-header\">\n            Logo here\n          </div>\n          <div class=\"card-block\">\n            <h4 class=\"card-title\">Login page</h4>\n            <p class=\"card-text\">Other pages</p>\n            <ul>\n              <li><a href=\"#\" click.trigger=\"navTo('#/app/dashboard')\">navTo('#/app/dashboard')</a></li>\n              <!--<li><a route-href=\"route: video\">Video</a></li>-->\n              <li><a route-href=\"route: app\">route-href=\"route: app\"</a></li>\n              <li><a route-href=\"route: signup\">route-href=\"route: signup\"</a></li>\n            </ul>\n          </div>\n          <router-nav router.bind=\"router\"></router-nav>\n        </div>\n      </div>\n    </div>\n  </div>\n\n</template>\n"; });
define('text!app-signup/index.html', ['module'], function(module) { module.exports = "<template>\n\n  <div class=\"container-fluid\">\n    <div class=\"row\">\n      <div class=\"col-lg-4 col-md-5 offset-lg-3 offset-md-4\">\n        <div class=\"card\">\n          <div class=\"card-header\">\n            Logo here\n          </div>\n          <div class=\"card-block\">\n            <h4 class=\"card-title\">Signup page</h4>\n            <p class=\"card-text\">Other pages</p>\n            <ul>\n              <li><a href=\"#\" click.trigger=\"navTo('#/app/dashboard')\">navTo('#/app/dashboard')</a></li>\n              <!--<li><a route-href=\"route: video\">Video</a></li>-->\n              <li><a route-href=\"route: app\">route-href=\"route: app</a></li>\n              <li><a route-href=\"route: login\">route-href=\"route: login</a></li>\n            </ul>\n          </div>\n          <router-nav router.bind=\"router\"></router-nav>\n        </div>\n      </div>\n    </div>\n  </div>\n\n</template>\n"; });
define('text!app/dashboard/index.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"card\">\n\n    <div class=\"card-header\">\n      app/dashboard/index.html\n    </div>\n\n    <div class=\"card-block\">\n      <h1 class=\"card-title\">Dashboard Card</h1>\n      <p class=\"card-text\">${message}</p>\n      <a href=\"#\" class=\"btn btn-primary\">Maybe save changes</a>\n    </div>\n\n    <router-nav router.bind=\"router\"></router-nav>\n\n  </div>\n</template>\n"; });
define('text!app/profile/index.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"card\">\n\n    <div class=\"card-header\">\n      app/profile/index.html\n    </div>\n\n    <div class=\"card-block\">\n      <h1 class=\"card-title\">Profile Card</h1>\n      <a href=\"#\" class=\"btn btn-primary\">Maybe save changes</a>\n    </div>\n\n    <router-nav router.bind=\"router\"></router-nav>\n\n  </div>\n</template>\n"; });
define('text!app/video/index.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"card\">\n\n    <div class=\"card-header\">\n      app/video/index.html\n    </div>\n\n    <div class=\"card-block\">\n      <h1 class=\"card-title\">Video</h1>\n      <p class=\"card-text\">${message}</p>\n      <a href=\"#\" class=\"btn btn-primary\">Maybe save changes</a>\n    </div>\n\n    <router-nav router.bind=\"router\"></router-nav>\n\n\n  </div>\n</template>\n"; });
define('text!resources/elements/router-nav.html', ['module'], function(module) { module.exports = "<template bindable=\"router\">\n  <div class=\"card-block\">\n    <h4 class=\"card-title\">router.navigation</h4>\n    <ul class=\"list-group list-group-flush\">\n      <li repeat.for=\"row of router.navigation\" class=\"list-group-item\">\n        <a class=\"card-link\" href.bind=\"row.href\">\"${row.title}\"</a>\n      </li>\n    </ul>\n  </div>\n</template>\n"; });
//# sourceMappingURL=app-bundle.js.map