import {app, ws} from '../api/index.js'
const server = app.listen(8080, () => {
  console.log('server listening on port 8080.')
})
server.on('upgrade', (request, socket, head) => {
  ws.handleUpgrade(request, socket, head, socket => {
    ws.emit('connection', socket, request);
  });
});