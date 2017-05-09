export class RouteFactory {
  constructor () {
  }

  get routeData () {
    return [];
  }

  /**
   *
   * @param [options] {Object}
   * @param [options.folder] {String} Folder under which route modules can be found, if not current
   *   folder
   * @param [options.viewPortName] {String} Router view port name
   * @param [options.auth] {Boolean} If set, override auth to this value
   * @param [options.nav] {Boolean} If set, override nav to this value
   * @param [options] {Object}
   */
  routes (options) {
    options = options || {};
    const rootFolder = options.folder ? ('./' + options.folder + '/') : './';
    const result = this.routeData.map(r => {
      let moduleId = rootFolder + (r.folder || r.name) + '/index';
      let auth = (typeof options.auth === 'boolean') ? options.auth : r.auth;
      let nav = (typeof options.nav === 'boolean') ? options.nav : r.nav;
      let route = options.routePath ? (options.routePath + '/' + r.route) : r.route;
      let href = r.href;
      if (!href && options.href === true) {
        href = ( typeof r.route === 'string') ? r.route : r.route[0];
      }
      let item = {
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
  }

}
