import {inject, LogManager} from 'aurelia-framework';
import {AuthService} from '../services/auth-service';

let logger = LogManager.getLogger('app.login');

@inject(AuthService)
export class AppLogin {
  constructor (authService) {
    this.auth = authService;
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


  login () {
    logger.debug('login');
    this.auth.login(this.email, 'xxxxx');
  }

}
