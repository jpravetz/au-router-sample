import {LogManager} from 'aurelia-framework';

let logger = LogManager.getLogger('app.login');

export class AppLogin {
  constructor () {
    logger.debug('constructor');
    localStorage.setItem('au-router-sample-login', false);
  }

  login () {
    localStorage.setItem('au-router-sample-login', true);
    this.router.navigate('#/app/dashboard');
  }

}
