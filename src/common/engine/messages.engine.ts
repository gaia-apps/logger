import { Injectable } from "@nestjs/common";
import { GaiaEngineLogger } from "./engine.interface";
import { connect, Channel, Connection, ChannelModel } from 'amqplib';

@Injectable()
export class GaiaMessagesEngine implements GaiaEngineLogger  {
    private connection!: ChannelModel;
    private channel!: Channel;
    private readonly queue = 'logger_queue';

    async build(options: any) {
        const url = options?.host ?? 'amqp://localhost'
        console.log(url)
        this.connection = await connect(url); // Use env
        this.channel = await this.connection.createChannel();
        await this.channel.assertQueue(this.queue, { durable: true });
    }

    static async init(options: any) {
        if (!options?.host) {
            throw Error('Cannot initialise messages log')
        }
        let engine = new GaiaMessagesEngine()
        engine.build(options)   
        return engine
    }
    
    async write(params: any) {
        const logPayload = this.formatMessage(params)
        this.channel.sendToQueue(
            this.queue, 
            Buffer.from(JSON.stringify(logPayload)), 
            { persistent: true, }
        )
    }

    formatMessage(params: any):string {
        return JSON.stringify({message: params.message, metadata: params?.metadata ?? {}})
    }
}