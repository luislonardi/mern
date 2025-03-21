import { StatusCodes } from "http-status-codes";

export const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);
  res
    .status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ msg: err.message || "something went wrong" });
};
