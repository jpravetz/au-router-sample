import { LogManager} from 'aurelia-framework';

let logger = LogManager.getLogger('app.video.edit');

export class VideoPage {
  constructor () {
    logger.debug('constructor');
  }
}
