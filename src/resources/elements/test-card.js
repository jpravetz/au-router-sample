import {LogManager, bindable} from 'aurelia-framework';

let logger = LogManager.getLogger('element.test.filler');

export class TestCardCustomElement {
  @bindable title;
  @bindable message;
  secretMessage = 'Be sure to drink your Ovaltine!';

  constructor () {
    logger.debug('constructor!');
    this.showExtra = true;
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
    logger.debug('attached!');
  }

  showToggle () {
    this.showExtra = this.showExtra ? false : true;
    logger.debug('showToggle!');
  }
}
