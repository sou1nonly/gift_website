import { Request, Response, NextFunction } from "express";
import logger from "../config/logger";

function errorHandler(err: any, req: Request, res: Response, next: NextFunction): void {
  logger.error(`Error during request: ${req.method} ${req.url} - ${err.message}`);
  logger.error(err.stack);

  if (!res.headersSent) {
    const statusCode = err.statusCode ?? 500;
    res.status(statusCode).json({
      ...err,
      message: err.message || "Internal Server Error",
    });
  } else {
    logger.warn("Headers already sent, cannot modify the response");
  }
}

export default errorHandler;
