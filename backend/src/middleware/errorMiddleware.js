const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || (res.statusCode === 200 ? 500 : res.statusCode);

  res.status(statusCode);

  res.json({
    message: err.userMessage || err.message || 'An unexpected error occurred.',
    retryAfter: err.retryAfter || null,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = { errorHandler };
