import {inject, LogManager} from 'aurelia-framework';
import {Routes} from './routes';
import {AuthService} from './services/auth-service';
import {Redirect} from 'aurelia-router';
//import {AuthorizeStep} from './services/authorize-step';

let logger = LogManager.getLogger('app.root');

@inject(Routes, AuthService)
export class App {
  constructor (routes, authService) {
    this.routes = routes;
    this.auth = authService;
    this.message = 'Loading...';
    this.loaded = false;
    this.routeOptions = { viewPort: 'main' };
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
    let step = new AuthorizeStep(this.auth);
    config.title = 'Test Console';
    config.addAuthorizeStep(step);
    const routeConfig = this.routes.routes(this.routeOptions);
    config.map(routeConfig);
    logger.debug('Configured root routes', routeConfig.map(c => c.name));
    logger.debug('Configured root routes', this.router.navigation);
  }

  navTo (route) {
    return this.router ? this.router.navigateToRoute(route) : undefined;
  }

}

export class AuthorizeStep {
  constructor (auth) {
    this.auth = auth;
  }

  run (navInstruction, next) {
    let isLoggedIn = this.auth.isLoggedIn;

    if (navInstruction.getAllInstructions().some(i => i.config.auth)) {
      if (!isLoggedIn) {
        return next.cancel(new Redirect('login'));
      }
    }

    return next();
  }
}
