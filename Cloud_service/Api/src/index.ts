import { RawData, WebSocket } from "ws";
import { FSM } from "./fsm/fsm";


function rawDataToString(data: RawData) {
    // console.log(typeof data);
    // if (typeof data === 'WebSocket.RawData') {
        return data.toString('utf8');
    // } else {
    //     throw new Error('Invalid input: not a WebSocket.RawData');
    // }
}

const wss = new WebSocket.Server({ port: 6001 });

let fsm = new FSM()

wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', (message) => {
        console.log(`Received message: ${message}`);
        fsm.setContext(rawDataToString(message));
        fsm.startFsm(); 
    });

    ws.send('Welcome to the server!');
});

// let id = 9445166;
// var value = 15.4;
// let roomId = 4895623;
// let name = "captor_name"
// let data = `{"id":"${id}", "name": "${name}", "room_id": "${roomId}", "value": "${value.toString()}"}`;
// let fsm = new FSM("tocloud//captors//"+data+"//update");
// fsm.startFsm();
