import { Injectable, Inject, LoggerService, LogLevel } from '@nestjs/common'
import { LogMode } from '../common/enums';
import { GaiaLoggerOptions } from '../logger/gaia.options.interface';
import { GAIA_LOGGER_MODULE_OPTIONS } from '../logger/gaia.constants';

@Injectable()
export class GaiaLogerService implements LoggerService {
    protected mode: LogMode = LogMode.NONE
    protected isEnabled: boolean = false
    protected silent: boolean = true
    protected filename: string = 'system.log'
    protected path: string = './logs'
    protected levels = ['debug', 'info', 'warn', 'error']
    protected level: string = 'info'
    protected format: string = 'json'
    protected metadata = {}

    constructor( 
        @Inject(GAIA_LOGGER_MODULE_OPTIONS) private readonly options: GaiaLoggerOptions
    ) {
        this.mode = options.mode || this.mode
        this.isEnabled = options.isEnabled || this.isEnabled
        this.silent = options.silent || this.silent
        this.filename = options.filename || this.filename
        this.path = options.path || this.path
        this.metadata = options.metadata || this.metadata
        this.level = options.level || this.level

        console.log(this.mode);
        console.log(this.isEnabled);
        console.log(this.silent);
        console.log(this.filename);
        console.log(this.path);
        console.log(this.metadata);
        console.log(this.levels);
        console.log(this.level);
    }

    log(message: any, ...optionalParams: any[]) {
        console.log(message);
    }
    error(message: any, ...optionalParams: any[]) {
        console.log(message);
    }
    warn(message: any, ...optionalParams: any[]) {
        console.log(message);
    }
    debug?(message: any, ...optionalParams: any[]) {
        console.log(message);
    }
    verbose?(message: any, ...optionalParams: any[]) {
        console.log(message);
    }
    fatal?(message: any, ...optionalParams: any[]) {
        console.log(message);
    }
    setLogLevels?(levels: LogLevel[]) {
        console.log('Method not implemented.');
    }
    
}