import {inject, LogManager} from 'aurelia-framework';
import {RootRoutes} from './root-routes';

let logger = LogManager.getLogger('app');

@inject(RootRoutes)
export class App {
  constructor (rootRoutes) {
    this.rootRoutes = rootRoutes;
    this.loaded = false;
    this.routeOptions = { viewPort: 'main'};
  }

  activate () {
    setTimeout(() => {
      this.loaded = true;
    }, 1000);
  }

  configureRouter (config, router) {
    this.router = router;
    config.title = 'Test Console';
    const routeConfig = this.rootRoutes.routes(this.routeOptions);
    config.map(routeConfig);
    logger.debug('Configured app routes', routeConfig.map(c => c.name));
  }

  navTo (route) {
    return this.router ? this.router.navigateToRoute(route) : undefined;
  }

}
