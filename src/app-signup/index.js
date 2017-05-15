import {inject, LogManager} from 'aurelia-framework';
import {AuthService} from '../services/auth-service';

let logger = LogManager.getLogger('app.signup');

@inject(AuthService)
export class AppSignup {
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


  signup () {
    logger.debug('signup');
    this.auth.login(this.email, 'xxxxx');
  }

}
