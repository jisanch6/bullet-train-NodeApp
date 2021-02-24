//catches error here from function wrapped in catchAsync
module.exports = (fn) =>
  //retuns new anonymous function which assigned to function wrapped in catchAsync
  (req, res, next) => {
    //catch method passes error into next function which ends up in global error handling middleware.
    fn(req, res, next).catch((err) => next(err));
  };
