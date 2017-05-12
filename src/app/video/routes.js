import {RouteFactory} from '../../route-factory';

export class Routes extends RouteFactory {

  constructor () {
    super();
  }

  get routeData () {
    return [
      // {
      //   route: '',
      //   redirect: 'list'
      // },
      {
        route: ['list',''],
        name: 'list',
        title: 'List'
      },
      {
        route: 'edit/:id',
        name: 'edit',
        href: 'edit',
        nav: false
      }
    ];
  }
}
