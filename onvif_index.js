/*
  name: onvif-events
  version: "1.0.0
  description: An implementation of Node.js that detects the events of your camera that works with the onvif protocol
  author: Rogério Luiz <rogerio.macdev@gmail.com>
*/

const ms = require('./onvif_motion_service.js');
const mnt = require('./onvif_events.js');

var motionState;

class MotionDetection {
  constructor(config = {}) {
    this.config = config
    this.url = config.url
    this.id = config.id
    this.hostname = config.hostname
    this.username = config.username
    this.password = config.password
    this.port = config.port
  }

  getMotionState(){
    return motionState;
  }

  async start() {
    const motion = new ms(this.config.url);
    const monitor = await mnt.create({
      id: this.config.id,
      hostname: this.config.hostname,
      username: this.config.username,
      password: this.config.password,
      port: this.config.port
    }, motion);
    monitor.start();
    

    function getState(){
      setInterval(function () {
        motionState = monitor.getMotionState();
      }, 100)
    }

    getState();
  }
}

module.exports = MotionDetection;

