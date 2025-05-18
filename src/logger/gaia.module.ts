import { Module, Global, DynamicModule, Provider, Type, NestModule, MiddlewareConsumer } from '@nestjs/common'
import { GaiaLogerService } from './gaia.service'
import { GAIA_LOGGER_MODULE_OPTIONS } from './gaia.constants';
import { GaiaLoggerAsyncOptions, GaiaLoggerOptions, GaiaLoggerOptionsFactory } from './gaia.options.interface';
import { HttpLoggerMiddleware } from './gaia.middleware';

@Global()
@Module({})
export class GaiaLogerModule  implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*'); // log all routes
  }

  static register(options: GaiaLoggerOptions): DynamicModule {
    return {
      module: GaiaLogerModule,
      providers: [
        {
          provide: 'GAIA_LOGGER_MODULE_OPTIONS',
          useValue: options,
        },
        GaiaLogerService,
      ],
      exports: [GaiaLogerService],
    };
  }

  static forRoot(options: GaiaLoggerOptions): DynamicModule {
    return {
      module: GaiaLogerModule,
      providers: [
        GaiaLogerService,
        {
          provide: GAIA_LOGGER_MODULE_OPTIONS,
          useValue: options,
        },
      ],
      exports: [GaiaLogerService],
    };
  }

  static forRootAsync(options: GaiaLoggerAsyncOptions): DynamicModule {
    return {
      module: GaiaLogerModule,
      imports: options.imports,
      providers: [
        GaiaLogerService,
        ...this.createAsyncProviders(options),
      ],
      exports: [GaiaLogerService],
    };
  }

  private static createAsyncProviders(options: GaiaLoggerAsyncOptions): Provider[] {
    if (options.useFactory || options.useExisting) {
      return [this.createAsyncOptionsProviders(options)];
    }

    const useClass = options.useClass as Type<GaiaLoggerOptionsFactory>;

    return [
      this.createAsyncOptionsProviders(options),
      { provide: useClass, useClass }
    ];
  }

  private static createAsyncOptionsProviders(options: GaiaLoggerAsyncOptions): Provider {
    if (options.useFactory) {
      return {
          provide: GAIA_LOGGER_MODULE_OPTIONS,
          useFactory: options.useFactory,
          inject: options.inject || [],
        }
    }

    const inject = [(options.useClass || options.useExisting) as Type<GaiaLoggerOptionsFactory>];

    return {
          provide: GAIA_LOGGER_MODULE_OPTIONS,
          useFactory: async (optionsFactory: GaiaLoggerOptionsFactory) => await optionsFactory.createLoggerOptions(),
          inject: inject,
        }
  }
}