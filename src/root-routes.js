import {RouteFactory} from './route-factory';

export class RootRoutes extends RouteFactory {

  constructor () {
    super();
  }

  get routeData () {
    return [
      {
        route: '', redirect: 'app'
      },
      {
        route: 'app',
        name: 'app'
      },
      {
        route: 'app-login',
        folder: 'app-login',
        name: 'login'
      },
      {
        route: 'app-signup',
        folder: 'app-signup',
        name: 'signup'
      }
    ];
  }
}
