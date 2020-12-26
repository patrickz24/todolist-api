module.exports = (error, req, res, next) => {
    console.error(`${error.name}\n  ${error.description}`);
    next(error);
  };