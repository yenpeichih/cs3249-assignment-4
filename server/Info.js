// New class to reformat what is sent to client

class Info {
  constructor(id, roomid, temperature, timestamp) {
    this.id = id;
    this.roomid = roomid;
    this.temperature = temperature;
    this.timestamp = timestamp;
  }
}

export default Info;
