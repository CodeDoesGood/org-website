import winston from 'winston';

const logLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    debug: 4,
  },
};

const Logger = new winston.Logger({
  levels: logLevels.levels,
  transports: [
    new winston.transports.Console({
      handleExceptions: false,
      json: false,
      colorize: true,
      level: 'debug',
    }),
  ],
  exitOnError: false,
});

export default Logger;
