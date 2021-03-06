import {RouteFactory} from '../route-factory';

export class Routes extends RouteFactory {

  constructor () {
    super();
  }

  get routeData () {
    return [
      {
        route: '',
        redirect: 'dashboard'
      },
      {
        route: 'dashboard',
        name: 'dashboard',
        title: 'Dashboard'
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
