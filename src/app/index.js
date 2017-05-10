import {inject, LogManager} from 'aurelia-framework';
import {AppRoutes} from './app-routes';

let logger = LogManager.getLogger('app.app');

@inject(AppRoutes)
export class App {
  constructor (appRoutes) {
    this.appRoutes = appRoutes;
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
    const routeConfig = this.appRoutes.routes(this.routeOptions);
    config.map(routeConfig);
    logger.debug('Configured app routes', routeConfig.map(c => c.name));
    logger.debug('Configured app routes', this.router.navigation);
  }

  get routes () {
    return routes;
  }

  navTo (routeName) {
    return this.router ? this.router.navigateToRoute(routeName) : undefined;
  }

}
