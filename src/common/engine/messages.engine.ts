import { Injectable } from "@nestjs/common";
import { GaiaEngineLogger } from "./engine.interface";
import { connect, Channel, Connection, ChannelModel } from 'amqplib';

@Injectable()
export class GaiaMessagesEngine extends GaiaEngineLogger  {
    private connection!: ChannelModel;
    private channel!: Channel;


    async build(options: any) {
        const url = options?.host ?? 'amqp://localhost'
        this.connection = await connect(url); // Use env
        this.channel = await this.connection.createChannel();
        await this.channel.assertQueue(this.options.queue, { durable: true });
    }

    static async init(options: any) {
        if (!options?.host) {
            throw Error('Cannot initialise messages log')
        }
        let engine = new GaiaMessagesEngine()
        await engine.build(options)   
        return engine
    }
    
    async write(params: any) {
        const logPayload = this.formatMessage(params)
        this.channel.sendToQueue(
            this.options.queue, 
            Buffer.from(logPayload), 
            { persistent: true,  contentType: 'application/json', }
        )
    }
}