import {inject, LogManager} from 'aurelia-framework';
import {Routes} from './routes';
import {AuthService} from '../services/auth-service';

let logger = LogManager.getLogger('app.app');

@inject(Routes, AuthService)
export class App {
  constructor (routes, authService) {
    this._routes = routes;
    this.auth = authService;
    this.routeOptions = { viewPort: 'content' };
    logger.debug('constructor');
  }

  activate () {
    logger.debug('activate...');
    setTimeout(() => {
      logger.debug('activated');
    }, 500);
  }

  attached () {
    logger.debug('attached');
  }

  configureRouter (config, router) {
    this.router = router;
    config.title = 'App Pages';
    const routeConfig = this._routes.routes(this.routeOptions);
    config.map(routeConfig);
    logger.debug('Configured app routes', routeConfig.map(c => c.name));
    logger.debug('Configured app routes', this.router.navigation);
  }

  get routes () {
    return _routes;
  }

  navTo (routeName) {
    return this.router ? this.router.navigateToRoute(routeName) : undefined;
  }

}
