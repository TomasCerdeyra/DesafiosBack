const log4js = require("log4js");

log4js.configure({
    appenders: {
        console: { type: "console" },
        fileWarn: { type: "file", filename: "warn.log" },
        fileError: { type: "file", filename: "error.log" },
    },
    categories: {
        default: { appenders: ["console"], level: "info" },
        warn: { appenders: ["fileWarn", "console"], level: "warn" },
        error: { appenders: ["fileError", "console"], level: "error" },
    },
});

const logger = log4js.getLogger();
const loggerWarn = log4js.getLogger("warn");
const loggerError = log4js.getLogger("error");

module.exports = { logger, loggerWarn, loggerError };