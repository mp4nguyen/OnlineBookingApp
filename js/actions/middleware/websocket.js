
import {SELECT_SLOT} from '../booking';

var socket = null;


//
// ws.onopen = () => {
//   // connection opened
//    // send a message
//   //setInterval(()=>{ws.send('something');},1000);
// };
//
// ws.onmessage = (e) => {
//   // a message was received
//   console.log("receive = ",e.data);
// };
//
// ws.onerror = (e) => {
//   // an error occurred
//   console.log(e.message);
// };
//
// ws.onclose = (e) => {
//   // connection closed
//   console.log(e.code, e.reason);
// };


export function chatMiddleware(store) {
  return next => action => {
    const result = next(action);

    if (socket && action.type === SELECT_SLOT) {
      // let messages = store.getState().messages;
      console.log("=======> slot = ",action.payload);
      var sendObject = {type:'slot',message:action.payload}
      socket.send( JSON.stringify(sendObject)  );
    }

    return result;
  };
}

export default function (store) {
  //socket = io.connect(`${location.protocol}//${location.host}`);
  socket = new WebSocket('ws://localhost:8000/socket');
  socket.onmessage = (e) => {
    // a message was received
    console.log("receive = ",e.data);
  };
  // socket.on('message', data => {
  //   //store.dispatch(actions.addResponse(data));
  // });
}
