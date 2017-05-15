import {inject, LogManager} from 'aurelia-framework';
import {AuthService} from '../services/auth-service';

let logger = LogManager.getLogger('app.logout');


@inject(AuthService)

export class AppLogout {

  constructor (authService) {
    this.auth = authService;
    logger.debug('constructor');
  }

  activate () {
    logger.debug('activate...');
    this.auth.logout()
      .then(response => {
        logger.debug('ok logged out on  logout.js');
      })
      .catch(err => {
        logger.debug('error logged out  logout.js');
      });
  }
}
