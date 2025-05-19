export abstract class GaiaEngineLogger {
    async write(params: any) {
        throw new Error('It needs to be implemented')
    }
    static async init(options: any): Promise<GaiaEngineLogger> {
        throw new Error('It needs to be implemented')
    }
}

