import { Injectable, Logger, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

import { GaiaLogerService } from './gaia.service';

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(HttpLoggerMiddleware.name);

  use(req: Request, res: Response, next: NextFunction) {
    const { method, url } = req;
    const start = Date.now();

    res.on('finish', () => {
      const duration = Date.now() - start;
      const message = `${method} ${url} ${res.statusCode} - ${duration}ms`;
      this.logger.log(message);
    });

    next();
  }
}