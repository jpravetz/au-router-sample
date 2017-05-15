import {inject, LogManager} from 'aurelia-framework';
import {VideoEditPage} from '../index';
import {Routes} from './routes';

let logger = LogManager.getLogger('app.video.edit');

@inject(VideoEditPage, Routes)
export class VideoEditReportPage {
  constructor (videoEditPage,routes) {
    this.message = 'VideoEditReportPage';
    this.routes = routes;
    this.videoEditPage = videoEditPage;
  }

  activate (params) {
    logger.debug('activate', params);
    this.video = this.videoEditPage.video;
  }


  configureRouter (config, router) {
    this.router = router;
    config.title = 'Video Edit Report Pages';
    const routeConfig = this.routes.routes(this.routeOptions);
    config.map(routeConfig);
    logger.debug('Configured app routes', routeConfig.map(c => c.name));
    logger.debug('Configured app routes', this.router.navigation);
  }

}
