// src/utils/logger.ts
import { createLogger, format, transports } from 'winston';

const Logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        format.json()
    ),
    transports: [
        new transports.Console(), // Log to the console
        new transports.File({ filename: 'combined.log' }), // Log to a file
    ],
});

export { Logger };

