import {RouteFactory} from '../../../route-factory';

export class Routes extends RouteFactory {

  constructor () {
    super();
  }

  get routeData () {
    return [
      {
        route: ['details', ''],
        name: 'details'
      },
      {
        route: 'report'
      },
      {
        route: 'payment'
      }
    ];
  }
}
