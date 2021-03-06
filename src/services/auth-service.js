import {inject, LogManager} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {EventAggregator} from 'aurelia-event-aggregator';

let logger = LogManager.getLogger('service.auth');

let instance = null;

@inject(EventAggregator, Router)
export class AuthService {
  constructor (eventAggregator, router) {
    if (!instance) {
      this.eventAggregator = eventAggregator;
      this.router = router;
      this.loggedIn = false;
      instance = this;
    }
    return instance;
  }

  get isLoggedIn () {
    return this.loggedIn;
  }

  login (email, password) {
    this.email = email;
    logger.debug('login');
    return Promise.resolve({ auth: true })
      .then((resp) => {
        this.loggedIn = true;
        return this.router.navigate('/');
      });
  }

  signup (displayName, email, password) {
    this.email = email;
    logger.debug('signup');
    return Promise.resolve({ auth: true })
      .then((resp) => {
        this.loggedIn = true;
        return this.router.navigate('/');
      });
  }

  isAuthenticated () {
    return this.email ? true : false
  }

  logout () {
    this.email = undefined;
    logger.debug('logout');
    return Promise.resolve()
      .then(() => {
        this.loggedIn = false;
        this.router.navigate('#/login');
      });
  }

}
