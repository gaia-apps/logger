import { Injectable } from "@nestjs/common";
import { GaiaEngineLogger } from "./engine.interface";
import * as fs from "fs";

@Injectable()
export class GaiaConsoleEngine implements GaiaEngineLogger {
    constructor(options: any) {
    }
    
    static init(options: any): Promise<GaiaEngineLogger> {
        return new Promise((resolve) => {
            resolve(new GaiaConsoleEngine(options));
        });
    }

    async write(params: any) {
        console.log(`[File] ${this.formatMessage(params)}\n`);
    }

    formatMessage(params: any):string {
        return JSON.stringify({message: params.message, metadata: params?.metadata ?? {}})
    }
}