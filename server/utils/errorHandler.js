export const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let errMessage = err.message || "Something went wrong";

  res.status(statusCode).json({
    message: errMessage,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
