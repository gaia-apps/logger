import { Injectable, Inject, LoggerService, LogLevel } from '@nestjs/common'
import { LogMode } from '../common/enums';
import { GaiaLoggerOptions } from '../logger/gaia.options.interface';
import { GAIA_LOGGER_MODULE_OPTIONS } from '../logger/gaia.constants';
import { GaiaEngineLogger } from '../common/engine/engine.interface';
import { GaiaEngineFactory } from '../common/engine/engine';

@Injectable()
export class GaiaLogerService implements LoggerService {
    protected mode: LogMode = LogMode.CONSOLE
    protected isEnabled: boolean = false
    protected silent: boolean = true
    protected filename: string = 'system.log'
    protected path: string = './logs'
    protected levels = ['debug', 'info', 'warn', 'error']
    protected level: 'debug' | 'info' | 'warn' | 'error' | 'trace' = 'info'
    protected format: string = 'json'
    protected metadata = {}
    protected options: any = {}
    protected host = ''
    protected logger: Promise<GaiaEngineLogger>

    constructor( 
        @Inject(GAIA_LOGGER_MODULE_OPTIONS) private readonly baseOptions: GaiaLoggerOptions
    ) {
        this.options.env = baseOptions.environment || process.env.ENV
        this.options.service = baseOptions.serviceName || process.env.SERVICE
        this.options.level = baseOptions.level || process.env.LOG_LEVEL || this.level

        this.options.mode = baseOptions.mode || this.mode
        this.options.isEnabled = baseOptions.isEnabled || this.isEnabled
        this.options.silent = baseOptions.silent || this.silent
        this.options.filename = baseOptions.filename || this.filename
        this.options.path = baseOptions.path || this.path
        this.options.metadata = baseOptions.metadata || this.metadata
        this.options.host = baseOptions.host || this.host

        this.logger = GaiaEngineFactory.getLogger(this.options)
    }

    async log(message: any, ...optionalParams: any[]) {
        (await this.logger).write({message, optionalParams})
    }
    error(message: any, ...optionalParams: any[]) {
        this.log(message, {...optionalParams, lvl: 'error'})
    }
    warn(message: any, ...optionalParams: any[]) {
        this.log(message, {...optionalParams, lvl: 'warn'})
    }
    debug?(message: any, ...optionalParams: any[]) {
        this.log(message, {...optionalParams, lvl: 'debug'})
    }
    verbose?(message: any, ...optionalParams: any[]) {
        this.log(message, {...optionalParams, lvl: 'verbose'})
    }
    fatal?(message: any, ...optionalParams: any[]) {
        this.log(message, {...optionalParams, lvl: 'fatal'})
    }
    setLogLevels?(levels: LogLevel[]) {
        console.log('Method not implemented.');
    }
    
}