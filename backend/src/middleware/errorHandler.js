export function notFoundHandler(req, res, next) {
  res.status(404).json({
    error: "Not Found",
    message: `Route ${req.method} ${req.originalUrl} does not exist.`
  });
}

// eslint-disable-next-line no-unused-vars
export function globalErrorHandler(err, req, res, next) {
  const status = err.status || 500;
  const message =
    status === 500 ? "Something went wrong on the server." : err.message;

  if (status === 500) {
    console.error(err);
  }

  res.status(status).json({
    error: status === 500 ? "Internal Server Error" : "Request Error",
    message
  });
}
