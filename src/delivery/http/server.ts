import app from "./app";
import http from "http";
import config from "../../configuration";

const logger = console;

const gracefulShutdown = (server: http.Server, forcedTimeout: number) => {
    return function () {
        logger.info("Received SIGINT or SIGTERM. Shutting down gracefully...");
        server.close(() => {
            logger.info("Closed out remaining connections.");
            process.exit();
        });

        // force stop after timeout
        setTimeout(() => {
            logger.error("Could not close connections in time, forcefully shutting down");
            process.exit();
        }, forcedTimeout);
    };
};


const server = http.createServer(app);


process.on("SIGTERM", gracefulShutdown(server, config.APP_FORCE_SHUTDOWN_SECOND));
process.on("SIGINT", gracefulShutdown(server, config.APP_FORCE_SHUTDOWN_SECOND));

server.listen(config.APPLICATION_SERVER_PORT, () => {
    logger.log("User CRUD API IS RUNNING: " + config.APPLICATION_SERVER_PORT);
});
