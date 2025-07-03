import { createLogger, format, transports, Logger } from "winston";
import "winston-daily-rotate-file";

const { combine, timestamp, printf } = format;

const logFormat = combine(
  timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  printf((info) =>
    `${info.timestamp} [${info.level.toUpperCase()}]: ${info.message}`
  )
);

const logger: Logger = createLogger({
  level: "info",
  format: logFormat,
  transports: [
    new transports.Console(),
    new transports.DailyRotateFile({
      filename: "logs/app-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxFiles: "7d",
    }),
  ],
});

export default logger;
