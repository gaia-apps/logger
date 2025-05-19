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
    protected logger: Promise<GaiaEngineLogger>

    constructor( 
        @Inject(GAIA_LOGGER_MODULE_OPTIONS) private readonly options: GaiaLoggerOptions
    ) {
        this.options.mode = options.mode || this.mode
        this.options.isEnabled = options.isEnabled || this.isEnabled
        this.options.silent = options.silent || this.silent
        this.options.filename = options.filename || this.filename
        this.options.path = options.path || this.path
        this.options.metadata = options.metadata || this.metadata
        this.options.level = options.level || this.level

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