import { Injectable } from "@nestjs/common";
import { GaiaEngineLogger } from "./engine.interface";
import * as fs from "fs";

@Injectable()
export class GaiaFileEngine implements GaiaEngineLogger {
    private readonly filePath: string;
    private readonly fileName: string;

    constructor(options: any) {
        this.filePath = options?.filePath ?? './var/log';
        this.fileName = options?.filename ?? 'system.log';
    }

    static init(options: any): Promise<GaiaEngineLogger> {
        return new Promise((resolve) => {
            resolve(new GaiaFileEngine(options));
        });
    }

    async write(params: any) {
        const filePath = `${this.filePath}/${(params?.filename ?? this.fileName)}`
        if (!fs.existsSync(this.filePath)) {
            fs.mkdirSync(this.filePath, { recursive: true });
        }
        const fd = fs.openSync(filePath, 'a+');
        
        fs.appendFileSync(fd, `[File] ${this.formatMessage(params)}\n`);
    }

    formatMessage(params: any):string {
        return JSON.stringify({message: params.message, metadata: params?.metadata ?? {}})
    }
}