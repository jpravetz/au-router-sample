import { inject, LogManager} from 'aurelia-framework';
import {Routes} from './routes';

let logger = LogManager.getLogger('app.video');

@inject(Routes)
export class VideoPage {
  constructor (routes) {
    this.routes = routes
    logger.debug('constructor');
  }

  configureRouter (config, router) {
    this.router = router;
    config.title = 'App Pages';
    const routeConfig = this.routes.routes(this.routeOptions);
    config.map(routeConfig);
    logger.debug('Configured app routes', routeConfig.map(c => c.name));
    logger.debug('Configured app routes', this.router.navigation);
  }

}
