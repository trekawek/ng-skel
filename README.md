A simple project skeleton built from following modules:

* [Bootstrap](http://getbootstrap.com/) with the basic theme
* [AngularJS](https://angularjs.org/)
* [ui-router](https://github.com/angular-ui/ui-router)
* [ng-token-auth](https://github.com/lynndylanhurley/ng-token-auth)
* [express.js](http://expressjs.com/)
  * with a custom token-based authorization
* [Redis](http://redis.io/)
* [Docker](https://www.docker.com/)
* [Fig](http://www.fig.sh/)

### Starting with Docker & Fig

1. Install Docker and Fig
2. `fig up`
3. Open http://localhost:3000

### Starting manually

    # (start redis)
    npm install
    ./node_modules/bower/bin/bower install
    npm start

### Screenshots

#### Login screen
![Login](https://raw.githubusercontent.com/trekawek/ng-skel/master/doc/login.png)

#### Project list
![Projects](https://raw.githubusercontent.com/trekawek/ng-skel/master/doc/projects.png)
