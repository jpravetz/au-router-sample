import {LogManager} from 'aurelia-framework';

let logger = LogManager.getLogger('app.profile');

export class Profile {
  constructor () {
    this.message = 'dashboard top';
    this.title = 'Profile';
    this.message = 'Profile message for test filler';
    logger.debug('contructor');
  }

  activate (data) {
    logger.debug('activate');
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        logger.debug('activated');
        resolve();
      }, 1000);
    });
  }

  attached () {
    logger.debug('attached');
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        logger.debug('attached delay');
        resolve();
      }, 1000);
    });
  }
}
