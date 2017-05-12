import { LogManager} from 'aurelia-framework';

let logger = LogManager.getLogger('app.video.list');

export class VideoPage {
  constructor () {
    logger.debug('constructor');
  }
}
