import { ContextService } from "@src/context.service";

export abstract class GaiaEngineLogger {
    
    constructor(private readonly contextService: ContextService) {}

    protected readonly options: any = {
        queue: 'logger_queue',
        service: '',
        env: '',
    };

    async write(params: any) {
        throw new Error('It needs to be implemented')
    }
    static async init(options: any): Promise<GaiaEngineLogger> {
        throw new Error('It needs to be implemented')
    }

    formatMessage(params: any):string {
        const payload = {
            pattern: this.options.queue,
            data: this.formatLogData(params)
        };
        return JSON.stringify(payload)
    }
    
    formatLogData(params: any) {
        const ctx = this.contextService.get();
        return {
                message: params.message,
                metadata: {
                    target: '',
                    propertyKey: '',
                    servive: this.options.service,
                    env: this.options.env,
                    lvl: this.options?.level ?? '',
                    createdAt: new Date().toUTCString(),
                    id_address: ctx?.ip ?? 'unknown',
                    chain_id: ctx?.requestId ?? 'no-id',
                    ...(params?.metadata ?? {})
                }
            }
    }
}

