import {inject} from 'aurelia-framework';
import {Redirect} from 'aurelia-router';

export class AuthorizeStep {
  constructor (auth) {
    this.auth = auth;
  }

  run (routingContext, next) {
    let isLoggedIn = localStorage.getItem('au-router-sample-login');

    if (routingContext.getAllInstructions().some(i => i.config.auth)) {
      if (!isLoggedIn) {
        this.auth.setInitialUrl(window.location.href);
        return next.cancel(new Redirect('#/app/dashboard'));
      }
    } else if (isLoggedIn && routingContext.getAllInstructions().some(i => i.fragment === loginRoute)) {
      return next.cancel(new Redirect('#/app/dashboard'));
    }

    return next();
  }
}
