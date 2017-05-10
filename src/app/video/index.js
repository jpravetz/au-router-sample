import { LogManager} from 'aurelia-framework';

let logger = LogManager.getLogger('app.video');

export class VideoPage {
  constructor () {
    logger.debug('constructor');
  }
}
