import {inject, LogManager} from 'aurelia-framework';
import {VideoPage} from '../index';
import {Routes} from './routes';

let logger = LogManager.getLogger('app.video.edit');

@inject(VideoPage, Routes)
export class VideoEditPage {
  constructor (videoPage, routes) {
    logger.debug('constructor');
    this.videoPage = videoPage;
    this.routes = routes;
  }

  activate (params) {
    logger.debug('activate', params);
    this.video = this.videoPage.getById(params);
  }

  configureRouter (config, router) {
    this.router = router;
    config.title = 'Video Edit Pages';
    const routeConfig = this.routes.routes(this.routeOptions);
    config.map(routeConfig);
    logger.debug('Configured app routes', routeConfig.map(c => c.name));
    logger.debug('Configured app routes', this.router.navigation);
  }

}
