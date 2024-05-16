import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuid } from 'uuid';
import { performance } from 'perf_hooks';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const requestId = uuid();
        console.info(`client requested: ${req.url}, request id: ${requestId}`);

        const invokationTime = performance.now();

        res.on('close', () => {
            const closingTime = performance.now();
            const executionTime = (closingTime - invokationTime).toFixed(2);

            console.log(
                `responded to request ${requestId} with ${res.statusCode}, duration: ${executionTime} ms`
            );
        });

        next();
    }
}
