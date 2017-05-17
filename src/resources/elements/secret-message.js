import {LogManager, bindable} from 'aurelia-framework';

let logger = LogManager.getLogger('element.secret-message');

export class SecretMessageCustomElement {
  @bindable title;
  @bindable message;
  @bindable msg;

  secretMessage = 'Be sure to drink your Ovaltine!';

  constructor () {
    logger.debug('constructor!');
    this.showExtra = true;
  }

  showToggle () {
    this.showExtra = this.showExtra ? false : true;
    logger.debug('showToggle!');
  }

  activate (data) {
    logger.debug('activate');
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        logger.debug('activated!');
        resolve();
      }, 1000);
    });
  }

  attached () {
    logger.debug('attached ...');
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.secretMessage = 'New secret message';
        logger.debug('attached!');
        resolve();
      }, 1000);
    });
  }

}

