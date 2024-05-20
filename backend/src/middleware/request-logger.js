export const request_logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};
