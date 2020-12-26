module.exports = (error, req, res, next) => {
    const { title, description } = error;
    res.status(error.status).json({
      title,
      description
    });
  };