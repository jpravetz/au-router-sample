import {inject, LogManager} from 'aurelia-framework';
import {RootRoutes} from './root-routes';
import {AuthorizeStep} from './authorize-step'

let logger = LogManager.getLogger('app.root');

@inject(RootRoutes)
export class App {
  constructor (rootRoutes) {
    this.rootRoutes = rootRoutes;
    this.message = 'Loading...';
    this.loaded = false;
    this.routeOptions = { viewPort: 'main'};
    logger.debug('constructor');
  }

  activate () {
    logger.debug('activate...');
    setTimeout(() => {
      logger.debug('activated');
      this.loaded = true;
      this.message = 'Loaded';
    }, 1000);
  }

  attached () {
    logger.debug('attached');
  }

  /**
   * This is called when the viewport is registered
   */
  configureRouter (config, router) {
    this.router = router;
    config.title = 'Test Console';
    config.addPipelineStep('authorize', AuthorizeStep); // Add a route filter to the authorize
    const routeConfig = this.rootRoutes.routes(this.routeOptions);
    config.map(routeConfig);
    logger.debug('Configured root routes', routeConfig.map(c => c.name));
    logger.debug('Configured root routes', this.router.navigation);
  }

  navTo (route) {
    return this.router ? this.router.navigateToRoute(route) : undefined;
  }

}

