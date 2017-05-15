import {inject, LogManager} from 'aurelia-framework';
import {Routes} from './routes';

let logger = LogManager.getLogger('app.video');

@inject(Routes)
export class VideoPage {
  constructor (routes) {
    this.routes = routes;
    logger.debug('constructor');
    this.videos = [];
    for (let vdx = 0; vdx < 10; vdx++) {
      let obj = {
        id: `VID000${vdx}`,
        name: `Video #${vdx}`,
        description: `This is Video #${vdx} of 10 Videos`
      };
      this.videos.push(obj);
    }
  }

  getById (id) {
    for (let vdx = 0; vdx < this.videos.length; vdx++) {
      if (this.videos[vdx].id === id) {
        return this.videos[vdx];
      }
    }
  }

  configureRouter (config, router) {
    this.router = router;
    config.title = 'App Pages';
    const routeConfig = this.routes.routes(this.routeOptions);
    config.map(routeConfig);
    logger.debug('Configured app routes', routeConfig.map(c => c.name));
    logger.debug('Configured app routes', this.router.navigation);
  }

}
