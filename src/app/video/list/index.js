import {inject, LogManager} from 'aurelia-framework';
import {VideoPage} from '../index';

let logger = LogManager.getLogger('app.video.list');

@inject(VideoPage)
export class VideoListPage {
  constructor (videoPage) {
    this.videoPage = videoPage;
    logger.debug('constructor');
  }

}
