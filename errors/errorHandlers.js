import { StatusCodes } from "http-status-codes";

const errorHandler = (err, req, res, next) => {
  let errorMsg = err.message || "something went wrong ";
  let errorStatusCode = err.status || 500;

  if (err && err.errors) {
    errorMsg = Object.keys(err.errors)
      .map((error) => err.errors[error].message)
      .join(" & ");

    errorStatusCode = StatusCodes.BAD_REQUEST;
  }
  // if (err && err.name === "ValidationError") {
  //   errorMsg = "";

  //   errorStatusCode = StatusCodes.BAD_REQUEST;
  // }
  //   return res.json(err);
  return res.status(errorStatusCode).json({
    errorMsg,
  });
};

export default errorHandler;
