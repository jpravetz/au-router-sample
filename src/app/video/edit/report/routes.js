import {RouteFactory} from '../../../../route-factory';

export class Routes extends RouteFactory {

  constructor () {
    super();
  }

  get routeData () {
    return [
      {
        route: ['device', ''],
        name: 'device'
      },
      {
        route: 'location'
      }
    ];
  }
}
