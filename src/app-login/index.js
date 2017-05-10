import { LogManager} from 'aurelia-framework';

let logger = LogManager.getLogger('app.login');

export class AppLogin {
  constructor () {
    logger.debug('constructor');
  }

}
