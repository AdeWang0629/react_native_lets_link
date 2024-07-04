import io from 'socket.io-client';

const SOCKET_URL = 'http://50.18.33.245:4000';
// const SOCKET_URL = 'http://192.168.0.105:4000';

class WSService {
  initializeSocket = async () => {
    try {
      this.socket = io(SOCKET_URL, {
        transports: ['websocket'],
      });
      // console.log('initializing socket', this.socket);

      this.socket.on('connect', data => {
        console.log('=== user connected ====');
      });

      this.socket.on('disconnect', data => {
        console.log('=== user disconnected ====');
      });

      this.socket.on('error', data => {
        console.log('socekt error', data);
      });
    } catch (error) {
      console.log('scoket is not inialized', error);
    }
  };

  emit(event, data = {}, cb) {
    this.socket.emit(event, data,cb);
  }

  on(event, cb) {
    this.socket.on(event, cb);
  }
  off(event, cb) {
    this.socket.off(event, cb);
  }
  removeListener(listenerName) {
    this.socket.removeListener(listenerName);
  }
}

const userSocket = new WSService();

export default userSocket;