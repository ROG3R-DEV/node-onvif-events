/*
  name: onvif-events
  version: "1.0.0
  description: An implementation of Node.js that detects the events of your camera that works with the onvif protocol
  author: Rogério Luiz <rogerio.macdev@gmail.com>
*/

const chalk = require('chalk');
const {Cam} = require('onvif');

var motionState;

let MotionTopic = {
    CELL_MOTION_DETECTOR: 'CELL_MOTION_DETECTOR',
    MOTION_ALARM: 'MOTION_ALARM',
  };
  
  class Monitor {
    constructor(id, onvifCam, motion) {
      this.id = id;
      this.onvifCam = onvifCam;
      this.motion = motion;
      this.lastMotionDetectedState = null;
      this.topic = MotionTopic.MOTION_ALARM;
    }
  
    logTime = () => {
      let nowDate = new Date();
      return nowDate.toLocaleDateString() + ' ' + nowDate.toLocaleTimeString([], { hour12: false });
    }

    async start() {
      this.onvifCam.on('event', camMessage => this.onEventReceived(camMessage));
      console.log(this.logTime(), process.pid, chalk.bold.blue('[MOTION DETECTION]'),'Detecção de movimento iniciada');
    }
  
    onEventReceived(camMessage) {
      const topic = camMessage.topic._;
      if (topic.match(/RuleEngine\/CellMotionDetector\/Motion$/)) {
        this.onMotionDetectedEvent(camMessage);
      }
    }
  
    onMotionDetectedEvent(camMessage) {
      const isMotion = camMessage.message.message.data.simpleItem.$.Value;
      if (this.lastMotionDetectedState !== isMotion) {
        //console.log(this.logTime(), process.pid, chalk.bold.red('[MOTION DETECTION]'),'CAMERA',this.id,': Movimento detectado (CellMotionDetector):',isMotion);
        this.motion.setAlarm(this.id, isMotion);
        motionState = isMotion;
      }
      this.lastMotionDetectedState = isMotion
    }
    
    getMotionState(){
      return motionState;
    }

    static createCamera(conf) {
      return new Promise(resolve => {
        const cam = new Cam(conf, () => resolve(cam));
      })
    }
  
    static async create({id, hostname, username, password, port}, motion) {
      const cam = await this.createCamera({
        hostname,
        username,
        password,
        port
      });
      return new Monitor(id, cam, motion);
    }
  }

  module.exports = Monitor;