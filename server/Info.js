// New class to reformat what is sent to client
// Got this tip from Nuwan so I am actually not too sure why we need this

class Info {
    constructor(id,roomid,temperature,timestamp) {
        this.id = id;
        this.roomid = roomid
        this.temperature = temperature;
        this.timestamp = timestamp

    }
}

export default Info