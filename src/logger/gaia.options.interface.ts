import { LogMode } from "../common/enums";
import { ModuleMetadata, Type } from '@nestjs/common';

export interface GaiaLoggerOptions {
  isEnabled?: boolean
  mode?: LogMode
  silent?: boolean
  path?: string
  filename?: string
  level?: 'debug' | 'info' | 'warn' | 'error' | 'trace';
  metadata?: Object,
  serviceName?: string,
  environment?: string,
  http?: boolean,
}

export interface GaiaLoggerOptionsFactory {
  createLoggerOptions(): Promise<GaiaLoggerOptions> | GaiaLoggerOptions;
}

export interface GaiaLoggerAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<GaiaLoggerOptionsFactory>;
  useClass?: Type<GaiaLoggerOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<GaiaLoggerOptions> | GaiaLoggerOptions;
  inject?: any[];
}