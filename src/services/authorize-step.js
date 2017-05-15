import {inject} from 'aurelia-framework';
import {Redirect} from 'aurelia-router';
import {AuthService} from './auth-service';

@inject(AuthService)
export class AuthorizeStep {
  constructor (auth) {
    this.auth = auth;
  }

  run (routingContext, next) {
    let isLoggedIn = this.auth.isAuthenticated();

    if (routingContext.getAllInstructions().some(i => i.config.auth)) {
      if (!isLoggedIn) {
        return next.cancel(new Redirect('login'));
      }

      return next();
    }
  }
}
