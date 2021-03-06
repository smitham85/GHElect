const path = require('path');
const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const db = require('./db');
const sessionStore = new SequelizeStore({ db });
const PORT = process.env.PORT || 8082;
const app = express();
//const socketio = require('socket.io');
const jwt = require('jsonwebtoken');
const config = process.env.SESSION_SECRET || 'the very best secret';
module.exports = app;

const createApp = () => {
  // logging middleware
  app.use(morgan('dev'));

  // body parsing middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // compression middleware
  app.use(compression());

  // auth and api routes
  app.use('/auth', require('./auth'));
  app.use('/api', require('./api'));

  // static file-serving middleware
  app.use(express.static(path.join(__dirname, '..', 'public')));

  app.use(express.static(path.join(__dirname, '../static/media')));

  // any remaining requests with an extension (.js, .css, etc.) send 404
  app.use((req, res, next) => {
    if (path.extname(req.path).length) {
      const err = new Error('Not found');
      err.status = 404;
      next(err);
    } else {
      next();
    }
  });

  /* JWT Token Authenticator to Protect API Routes */

  //set secret
  app.set('Secret', config);

  app.post('/authenticate', (req, res) => {
    if (req.body.username === 'cody@email.com') {
      if (req.body.password === '123') {
        //if eveything is okay let's create our token

        const payload = {
          check: true,
        };

        var token = jwt.sign(payload, app.get('Secret'), {
          expiresIn: 1440, // expires in 24 hours
        });

        res.json({
          message: 'authentication done ',
          token: token,
        });
      } else {
        res.json({ message: 'please check your password !' });
      }
    } else {
      res.json({ message: 'user not found !' });
    }
  });

  //----------------------------------------------------

  // sends index.html
  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'));
  });

  // error handling endware
  app.use((err, req, res, next) => {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error.');
  });
};

const startListening = () => {
  // start listening (and create a 'server' object representing our server)
  const server = app.listen(PORT, () =>
    console.log(`Mixing it up on port ${PORT}`)
  );

  // set up our socket control center
  // const io = socketio(server);
  // require('./socket')(io);
};

const syncDb = () => db.sync();
// const syncDb = () => db.sync({force: true})

async function bootApp() {
  await sessionStore.sync();
  await syncDb();
  await createApp();
  await startListening();
}
// This evaluates as true when this file is run directly from the command line,
// i.e. when we say 'node server/index.js' (or 'nodemon server/index.js', or 'nodemon server', etc)
// It will evaluate false when this module is required by another module - for example,
// if we wanted to require our app in a test spec
if (require.main === module) {
  bootApp();
} else {
  createApp();
}
