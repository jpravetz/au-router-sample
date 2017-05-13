import {inject,LogManager} from 'aurelia-framework';
import {AuthService} from '../services/auth-service';

let logger = LogManager.getLogger('app.login');

@inject(AuthService)
export class AppLogin {
  constructor (authService) {
    this.auth = authService;
    logger.debug('constructor');
  }

  login (email) {
    this.auth.login(email,'xxxxx');
  }

}
