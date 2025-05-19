import { Injectable } from "@nestjs/common";
import { GaiaEngineLogger } from "./engine.interface";
import { LogMode } from "../enums";
import { GaiaFileEngine } from "./file.engine";
import { GaiaConsoleEngine } from "./console.engine";
import { GaiaMessagesEngine } from "./messages.engine";


@Injectable()
export class GaiaEngineFactory {
    static  async getLogger(options?: any): Promise<GaiaEngineLogger> {
        try {
            switch (options.mode) {
                case LogMode.FILE:
                    return new GaiaFileEngine(options)
                    break;
                case LogMode.MESSAGES:
                    return await GaiaMessagesEngine.init(options)
                    break;
                default:
                    return new GaiaConsoleEngine(options)
                    break;
            }
        } catch (e) {
            console.error(e)
        }
        
        return new GaiaConsoleEngine(options)
    }
}