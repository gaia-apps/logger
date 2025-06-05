import { Injectable, Logger, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

import { GaiaLogerService } from './gaia.service';
import { ContextService } from '@src/context.service';

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(HttpLoggerMiddleware.name);
  constructor(private readonly contextService: ContextService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { method, url } = req;
    const start = Date.now();
    const ip: string = ( req.headers['x-forwarded-for'] || req.socket.remoteAddress || '').toString().split(',')[0].trim();
    const requestId: string = req.headers['x-request-id'] as string || crypto.randomUUID();

    this.contextService.enterWith({ ip, requestId });

    res.on('finish', () => {
      const duration = Date.now() - start;
      const message = `${method} ${url} ${res.statusCode} - ${duration}ms`;
      this.logger.log(message);
    });

    next();
  }
}