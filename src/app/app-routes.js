import {RouteFactory} from '../route-factory';

export class AppRoutes extends RouteFactory {

  constructor () {
    super();
  }

  get routeData () {
    return [
      {
        route: ['dashboard', ''],
        name: 'dashboard'
      },
      {
        route: 'video'
      },
      {
        route: 'profile'
      }
    ];
  }
}
