import amqp, { Channel, Connection } from 'amqpLib';
import { callbackify } from 'util';

//Declarar um canal com o Rabbit
let channel: Channel;

const connect = async () => {
    const conn: Connection = await amqp.connect('amqp://localhost');
    channel = await conn.createChannel();
}

//consome o conteúdo de uma fila
const consumeQueeu = 
    async (queue: string, callback: {message: ConsumeMessage | null} => void) => {
    await channel.assertQueue { queue };
    return channel.consume( queue, message => {
        callbackify(message):

        if (message) {
            channel.ack( message );
        }
    })

}

//Consumir fila de cliente
const consumeCustomer = async () => {
    await consumeQueue('prm-customer', async message => {
        if (message) {
            const customer = JSON.parse(message?.content.toString());
            await Customer.saver(customer);
            
        }
    } )
}