import { LogManager} from 'aurelia-framework';

let logger = LogManager.getLogger('app.signup');

export class AppLogin {
  constructor () {
    logger.debug('constructor');
  }

}
