import { Injectable } from "@nestjs/common";
import { GaiaEngineLogger } from "./engine.interface";
import * as fs from "fs";

@Injectable()
export class GaiaFileEngine implements GaiaEngineLogger {
    private readonly filePath: string;
    private readonly fileName: string;

    constructor(options: any) {
        this.filePath = options?.filePath ?? './var/log';
        this.fileName = options?.fileName ?? './var/log';
    }

    static init(options: any): Promise<GaiaEngineLogger> {
        return new Promise((resolve) => {
            resolve(new GaiaFileEngine(options));
        });
    }

    async write(params: any) {
        const filePath = `${this.filePath}/${(params?.filename ?? this.fileName)}`
        fs.appendFileSync(filePath, `[File] ${this.formatMessage(params)}\n`);
    }

    formatMessage(params: any):string {
        return JSON.stringify({message: params.message, metadata: params?.metadata ?? {}})
    }
}