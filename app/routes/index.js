const express = require('express');
const passport = require('passport');
const logger = require('winston');
const { ServerError } = require('../helpers/server_error');
const { checkUserRole } = require('../middleware/auth');
const controllers = require('../controllers');

const router = express.Router();
const {
  auth,
  users,
  cars,
  bookings,
} = controllers;

/**
 * Handles controller execution and responds to user (API version).
 * This way controllers are not attached to the API.
 * @param promise Controller Promise.
 * @param params (req) => [params, ...].
 */
const controllerHandler = (promise, params, noEnd) => async (req, res, next) => {
  const boundParams = params ? params(req, res, next) : [];
  try {
    const result = await promise(...boundParams);

    if (!noEnd) {
      return res.json({
        status: 200,
        data: result,
      });
    }
  } catch (error) {
    next(error);
  }
};

const apiRouter = express.Router();


/**
 * Auth.
 */
apiRouter.post('/auth',
  controllerHandler(auth.signin, (req, res, next) => [req, res])
);

/**
 * Users.
 */
apiRouter.post('/users',
  controllerHandler(users.createOne, (req, res, next) => [req.body])
);
apiRouter.get('/users/me',
  passport.authenticate('jwt', { session: false }),
  controllerHandler(users.getOne, (req, res, next) => [req.user._id])
);

/**
 * Cars.
 */
apiRouter.post('/cars',
  passport.authenticate('jwt', { session: false }),
  checkUserRole('admin'),
  controllerHandler(cars.createOne, (req, res, next) => [req.body])
);
apiRouter.get('/cars',
  passport.authenticate('jwt', { session: false }),
  checkUserRole(['admin', 'customer']),
  controllerHandler(cars.getAll, (req, res, next) => [req.query])
);
apiRouter.get('/cars/:id',
  passport.authenticate('jwt', { session: false }),
  checkUserRole(['admin', 'customer']),
  controllerHandler(cars.getOne, (req, res, next) => [req.params.id])
);
apiRouter.put('/cars/:id',
  passport.authenticate('jwt', { session: false }),
  checkUserRole('admin'),
  controllerHandler(cars.updateOne, (req, res, next) => [req.params.id, req.body])
);
apiRouter.delete('/cars/:id',
  passport.authenticate('jwt', { session: false }),
  checkUserRole('admin'),
  controllerHandler(cars.removeOne, (req, res, next) => [req.params.id])
);

/**
 * bookings.
 */
apiRouter.post('/cars/:id/book',
  passport.authenticate('jwt', { session: false }),
  checkUserRole(['admin', 'customer']),
  controllerHandler(bookings.createOne, (req, res, next) => [req.user._id, req.params.id, req.body])
);
apiRouter.get('/bookings',
  passport.authenticate('jwt', { session: false }),
  checkUserRole(['admin', 'customer']),
  controllerHandler(bookings.getAll, (req, res, next) => [req.query])
);
apiRouter.delete('/bookings/:id',
  passport.authenticate('jwt', { session: false }),
  checkUserRole(['admin', 'customer']),
  controllerHandler(bookings.removeOne, (req, res, next) => [req.params.id])
);


router.use('/v0.1.0', apiRouter);

/**
 * 404
 */
router.use((req, res, next) => {
  next(new ServerError('Not Found', 404));
});

/**
 * Error-handler.
 */
router.use((err, req, res, _next) => {
  // Expected errors always throw ServerError.
  // Unexpected errors will either throw unexpected stuff or crash the application.
  if (Object.prototype.isPrototypeOf.call(ServerError.prototype, err)) {
    return res.status(err.status || 500).json({ status: err.status || 500, message: err.message});
  }

  logger.error('~~~ Unexpected error exception start ~~~');
  console.error(req);
  logger.error(err);
  logger.error('~~~ Unexpected error exception end ~~~');


  return res.status(500).json({ status: 500, message: err.message });
});

module.exports = router;
