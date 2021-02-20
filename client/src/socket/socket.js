import io from 'socket.io-client';
let socket;
export const initiateSocket = (user) => {
  socket = io('http://localhost:3001');
  console.log(`Connecting socket...`);
  if (socket && user) socket.emit('join', user);
}
export const disconnectSocket = () => {
  console.log('Disconnecting socket...');
  if(socket) socket.disconnect();
}
export const subscribeToNewPost = (cb) => {
  if (!socket) return(true);
  socket.on('newPost', msg => {
    console.log('Websocket event received!');
    return cb(null, msg);
  });
}
export const sendMessage = (message) => {
    console.log("Inside Send Message", message);
    console.log(socket);
  if (socket) socket.emit('newPost', { message });
}